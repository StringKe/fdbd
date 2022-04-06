export class DriverExistsException extends Error {
    constructor() {
        super('存储驱动已经注册')
        this.name = 'DriverExistsException'
    }
}
