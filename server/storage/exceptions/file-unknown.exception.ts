export class FileUnknownException extends Error {
    constructor(stack: any, location: string) {
        super(`${location} 出现未知错误`)
        this.name = 'UnknownException'
        this.stack = stack
    }
}
