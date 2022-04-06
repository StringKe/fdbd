export class DriverNotCompleteException extends Error {
    constructor(methodName: string, driverName: string) {
        super(`驱动 [${driverName}] 未实现 [${methodName}] 方法`)
        this.name = 'DriverNotCompleteException'
    }
}
