export class FilePermissionException extends Error {
    constructor(stack: any, location: string) {
        super(`${location} 文件权限错误`)
        this.name = 'FilePermissionException'
        this.stack = stack
    }
}
