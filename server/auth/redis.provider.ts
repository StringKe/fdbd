import Redis from 'ioredis'

import { getRedis } from '../utils/redis'
import { Data, DataProvider, ReturnData } from './provider'

export class RedisProvider extends DataProvider {
    private redis: Redis

    constructor() {
        super()
        this.redis = getRedis()
    }

    async createData(
        dataId: string,
        data: Data,
        expiredAt?: number,
        userId?: string
    ): Promise<ReturnData> {
        const jsonData = JSON.stringify(data)
        expiredAt = expiredAt ?? 60 * 60 * 24 * 7 // 7 days
        await this.redis.set(dataId, jsonData, 'EX', expiredAt)
        if (userId) {
            await this.redis.sadd(`users:${userId}`, dataId)
            await this.redis.set(`bind:${dataId}`, userId, 'EX', expiredAt)
        }
        return {
            dataId,
            data,
            userId,
        }
    }

    async getData(dataId: string): Promise<ReturnData | null> {
        const jsonData = await this.redis.get(dataId)
        if (!jsonData) {
            return null
        }
        const data = JSON.parse(jsonData)
        const userId = await this.redis.get(`bind:${dataId}`)
        return {
            dataId,
            data,
            userId,
        }
    }

    async deleteData(dataId: string): Promise<ReturnData | null> {
        const data = await this.getData(dataId)
        await this.redis.del(dataId)
        const userId = this.redis.del(`bind:${dataId}`)
        if (userId) {
            await this.redis.srem(`users:${userId}`, dataId)
        }
        return data
    }

    async getDatas(userId: string): Promise<ReturnData[]> {
        const dataIds = await this.redis.smembers(`users:${userId}`)
        const datas = await Promise.all(dataIds.map(async (dataId) => await this.getData(dataId)))
        return datas.filter(Boolean) as ReturnData[]
    }

    async updateData(dataId: string, data: Data, userId?: string): Promise<ReturnData> {
        const jsonData = JSON.stringify(data)
        await this.redis.set(dataId, jsonData)

        if (userId) {
            await this.redis.sadd(`users:${userId}`, dataId)
            await this.redis.set(`bind:${dataId}`, userId)
        }

        return {
            dataId,
            data: data,
            userId,
        }
    }
}
