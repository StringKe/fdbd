import { DatabaseProvider } from './database.provider'
import { DataProvider } from './provider'
import { RedisProvider } from './redis.provider'

let provider: DataProvider | undefined = undefined

export function getAuthProvider() {
    if (provider) return provider

    const useRedis = process.env.USE_REDIS === 'true'

    if (useRedis) {
        provider = new RedisProvider()
    } else {
        provider = new DatabaseProvider()
    }

    return provider
}
