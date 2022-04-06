import { DriverNotCompleteException } from '@server/storage/exceptions/driver-not-complete.exception'

export interface StorageDriverConstructor<T extends StorageDriver = StorageDriver> {
    new (...args: any[]): T
}

export interface FileResponse {
    raw: unknown
}

export interface ExistsResponse extends FileResponse {
    exists: boolean
}

export interface ContentResponse<ContentType> extends FileResponse {
    content: ContentType
}

export interface StatResponse extends FileResponse {
    size: number
    modified: Date
}

export interface FileListItem {
    path: string
    type: 'directory' | 'file' | 'unknown'
    absPath?: string
}

export interface FileListResponse extends FileResponse {
    list: FileListItem[]
}

export interface DeleteResponse extends FileResponse {
    wasDeleted: boolean | null
}

export abstract class StorageDriver {
    public driver(): unknown {
        throw new DriverNotCompleteException('driver', this.constructor.name)
    }

    copy(src: string, dest: string): Promise<FileResponse> {
        throw new DriverNotCompleteException('copy', this.constructor.name)
    }

    delete(location: string): Promise<DeleteResponse> {
        throw new DriverNotCompleteException('delete', this.constructor.name)
    }

    exists(location: string): Promise<ExistsResponse> {
        throw new DriverNotCompleteException('exists', this.constructor.name)
    }

    get(location: string, encoding?: string): Promise<ContentResponse<string>> {
        throw new DriverNotCompleteException('get', this.constructor.name)
    }

    lists(location: string): Promise<FileListResponse> {
        throw new DriverNotCompleteException('lists', this.constructor.name)
    }

    getBuffer(location: string): Promise<ContentResponse<Buffer>> {
        throw new DriverNotCompleteException('getBuffer', this.constructor.name)
    }

    getStat(location: string): Promise<StatResponse> {
        throw new DriverNotCompleteException('getStat', this.constructor.name)
    }

    getStream(location: string): NodeJS.ReadableStream | Promise<NodeJS.ReadableStream> {
        throw new DriverNotCompleteException('getStream', this.constructor.name)
    }

    getUrl(location: string): string | Promise<string> {
        throw new DriverNotCompleteException('getUrl', this.constructor.name)
    }

    move(src: string, dest: string): Promise<FileResponse> {
        throw new DriverNotCompleteException('move', this.constructor.name)
    }

    put(location: string, content: Buffer | NodeJS.ReadableStream | string): Promise<FileResponse> {
        throw new DriverNotCompleteException('put', this.constructor.name)
    }
}
