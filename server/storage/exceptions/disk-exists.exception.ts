export class DiskExistsException extends Error {
    constructor() {
        super('存储已存在')
        this.name = 'DiskExistsException'
    }
}
