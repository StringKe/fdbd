import Redis from 'ioredis'

let redis: Redis | undefined = undefined

export function getRedis() {
    if (redis) return redis

    const redisOptions = {
        host: String(process.env.REDIS_HOST),
        port: Number(process.env.REDIS_PORT),
        password: String(process.env.REDIS_PASSWORD),
        db: Number(process.env.REDIS_DB),
    }

    return (redis = new Redis(redisOptions))
}
