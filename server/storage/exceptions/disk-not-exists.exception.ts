export class DiskNotExistsException extends Error {
    constructor() {
        super('存储不存在')
        this.name = 'DiskNotExistsException'
    }
}
