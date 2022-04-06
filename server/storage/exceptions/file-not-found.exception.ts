export class FileNotFoundException extends Error {
    constructor(stack: any, location: string) {
        super(`${location} 文件不存在`)
        this.name = 'FileNotFoundException'
        this.stack = stack
    }
}
