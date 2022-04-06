import fse from 'fs-extra'
import path from 'path'

import { FileNotFoundException, FilePermissionException, FileUnknownException } from '../exceptions'
import {
    ContentResponse,
    DeleteResponse,
    ExistsResponse,
    FileListResponse,
    FileResponse,
    StatResponse,
    StorageDriver,
} from '../storage.driver'
import { isReadableStream, pipeline } from '../utils'

export interface LocalStorageOptions {
    path: string
    urlPrefix?: string
}

function handleError(err: Error & { code: string; path?: string }, location: string): Error {
    switch (err.code) {
        case 'ENOENT':
            return new FileNotFoundException(err, location)
        case 'EPERM':
            return new FilePermissionException(err, location)
        default:
            return new FileUnknownException(err, location)
    }
}

export class LocalDriver extends StorageDriver {
    constructor(private options: LocalStorageOptions) {
        super()
        this.options.path = path.resolve(this.options.path)
    }

    driver(): typeof fse {
        return fse
    }

    __path(add: string): string {
        return path.join(this.options.path, add)
    }

    async copy(src: string, dest: string): Promise<FileResponse> {
        try {
            const result = await fse.copy(this.__path(src), this.__path(dest))
            return { raw: result }
        } catch (e) {
            throw handleError(e, `${src} -> ${dest}`)
        }
    }

    async delete(location: string): Promise<DeleteResponse> {
        try {
            const result = await fse.unlink(this.__path(location))
            return { raw: result, wasDeleted: true }
        } catch (e) {
            e = handleError(e, location)

            if (e instanceof FileNotFoundException) {
                return { raw: undefined, wasDeleted: false }
            }

            throw e
        }
    }

    async exists(location: string): Promise<ExistsResponse> {
        try {
            const result = await fse.pathExists(this.__path(location))
            return { exists: result, raw: result }
        } catch (e) {
            throw handleError(e, location)
        }
    }

    async get(location: string, encoding?: string): Promise<ContentResponse<string>> {
        try {
            const result = await fse.readFile(this.__path(location), {
                encoding: encoding || 'utf8',
            })
            return { content: result, raw: result }
        } catch (e) {
            throw handleError(e, location)
        }
    }

    async lists(location: string): Promise<FileListResponse> {
        try {
            const result = await fse.readdir(this.__path(location))
            return {
                list: result.map((path) => {
                    return {
                        type: fse.statSync(this.__path(path)).isDirectory() ? 'directory' : 'file',
                        path: path,
                        absPath: this.__path(path),
                    }
                }),
                raw: result,
            }
        } catch (e) {
            throw handleError(e, location)
        }
    }

    async getBuffer(location: string): Promise<ContentResponse<Buffer>> {
        try {
            const result = await fse.readFile(this.__path(location))
            return { content: result, raw: result }
        } catch (e) {
            throw handleError(e, location)
        }
    }

    async getStat(location: string): Promise<StatResponse> {
        try {
            const stat = await fse.stat(this.__path(location))
            return {
                size: stat.size,
                modified: stat.mtime,
                raw: stat,
            }
        } catch (e) {
            throw handleError(e, location)
        }
    }

    getStream(location: string): NodeJS.ReadableStream {
        try {
            return fse.createReadStream(this.__path(location))
        } catch (e) {
            throw handleError(e, location)
        }
    }

    getUrl(location: string): string {
        return `${this.options.urlPrefix || ''}/${location}`.replaceAll('//', '/')
    }

    async move(src: string, dest: string): Promise<FileResponse> {
        try {
            const result = await fse.move(this.__path(src), this.__path(dest))
            return { raw: result }
        } catch (e) {
            throw handleError(e, `${src} -> ${dest}`)
        }
    }

    async put(
        location: string,
        content: Buffer | NodeJS.ReadableStream | string
    ): Promise<FileResponse> {
        const fullPath = this.__path(location)

        try {
            if (isReadableStream(content)) {
                const dir = path.dirname(fullPath)
                await fse.ensureDir(dir)
                const writeStream = fse.createWriteStream(fullPath)
                await pipeline(content, writeStream)
                return { raw: undefined }
            }

            const result = await fse.outputFile(fullPath, content)
            return { raw: result }
        } catch (e) {
            throw handleError(e, location)
        }
    }
}
