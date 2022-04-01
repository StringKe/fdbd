export declare type Data = Record<string, any>

export interface ReturnData {
    userId?: string | null
    dataId: string
    data: Data
}

export abstract class DataProvider {
    constructor() {}

    abstract getDatas(userId: string): Promise<ReturnData[]>

    abstract getData(dataId: string): Promise<ReturnData | null>

    abstract createData(
        dataId: string,
        data: Data,
        expiredAt?: number,
        userId?: string
    ): Promise<ReturnData>

    abstract updateData(dataId: string, data: Data, userId?: string | null): Promise<ReturnData>

    abstract deleteData(dataId: string): Promise<ReturnData | null>
}
