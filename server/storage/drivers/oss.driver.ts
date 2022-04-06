import OSS, { Options } from 'ali-oss'
import fse from 'fs-extra'
import { get } from 'lodash'

import { FileNotFoundException, FilePermissionException, FileUnknownException } from '../exceptions'
import {
    ContentResponse,
    DeleteResponse,
    ExistsResponse,
    FileListItem,
    FileListResponse,
    FileResponse,
    StatResponse,
    StorageDriver,
} from '../storage.driver'

export interface OssDriverOptions extends Options {}

function handleError(err: Error, location: string): Error {
    if (err.message.includes('NoSuchKey')) {
        return new FileNotFoundException(err, location)
    } else if (err.message.includes('AccessDenied')) {
        return new FilePermissionException(err, location)
    } else {
        return new FileUnknownException(err, location)
    }
}

export class OssDriver extends StorageDriver {
    private readonly client: OSS

    constructor(private options: OssDriverOptions) {
        super()
        this.client = new OSS(options)
    }

    driver(): OSS {
        return this.client
    }

    async copy(src: string, dest: string): Promise<FileResponse> {
        try {
            const result = await this.client.copy(dest, src)
            return { raw: result }
        } catch (e) {
            throw handleError(e, `${src} -> ${dest}`)
        }
    }

    async delete(location: string): Promise<DeleteResponse> {
        try {
            const result = await this.client.delete(location)
            return { raw: result, wasDeleted: true }
        } catch (e) {
            const err = handleError(e, location)
            if (err instanceof FileNotFoundException) {
                return { raw: e, wasDeleted: false }
            }
            throw err
        }
    }

    async exists(location: string): Promise<ExistsResponse> {
        try {
            const result = await this.client.head(location)
            return { exists: true, raw: result }
        } catch (e) {
            const err = handleError(e, location)
            if (err instanceof FileNotFoundException) {
                return { exists: false, raw: e }
            }
            throw err
        }
    }

    async get(location: string): Promise<ContentResponse<string>> {
        try {
            const result = await this.client.get(location)
            return { content: result.content, raw: result }
        } catch (e) {
            throw handleError(e, location)
        }
    }

    async lists(location: string): Promise<FileListResponse> {
        try {
            const result = await this.client.list(
                { prefix: location, 'max-keys': 9999, delimiter: '/' },
                {}
            )
            const items: FileListItem[] = result.prefixes.map((item) => ({
                type: 'directory',
                path: item,
            }))
            result.objects.forEach((item) => {
                items.push({
                    type: 'file',
                    path: item.name,
                })
            })
            return {
                list: items,
                raw: result,
            }
        } catch (e) {
            throw handleError(e, location)
        }
    }

    async getBuffer(location: string): Promise<ContentResponse<Buffer>> {
        try {
            const result = await this.client.get(location)
            return { content: Buffer.from(result.content), raw: result }
        } catch (e) {
            throw handleError(e, location)
        }
    }

    async getStat(location: string): Promise<StatResponse> {
        try {
            const result = await this.client.head(location)
            return {
                raw: result,
                size: result.res.size,
                modified: get(result, 'res.headers.last-modified', null),
            }
        } catch (e) {
            throw handleError(e, location)
        }
    }

    async getStream(location: string): Promise<NodeJS.ReadableStream> {
        const result = await this.get(location)
        return fse.createReadStream(result.content)
    }

    getUrl(location: string): string {
        return this.client.generateObjectUrl(location)
    }

    move(src: string, dest: string): Promise<FileResponse> {
        return this.copy(src, dest).then(() => this.delete(src))
    }

    async put(
        location: string,
        content: Buffer | NodeJS.ReadableStream | string
    ): Promise<FileResponse> {
        try {
            const result = await this.client.put(location, content)
            return { raw: result }
        } catch (e) {
            throw handleError(e, location)
        }
    }
}
