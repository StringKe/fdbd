export class DriverNotExistsException extends Error {
    constructor() {
        super('存储驱动不存在，请注册')
        this.name = 'DriverNotExistsException'
    }
}
