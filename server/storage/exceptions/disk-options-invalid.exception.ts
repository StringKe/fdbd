export class DiskOptionsInvalidException extends Error {
    constructor(msg: string) {
        super(`存储配置错误 ${msg}`)
        this.name = 'DiskOptionsInvalidException'
    }
}
