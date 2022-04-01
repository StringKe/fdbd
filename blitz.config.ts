import { BlitzConfig, sessionMiddleware } from 'blitz'

import { Settings } from 'luxon'

import { AuthMiddleware } from './server/auth/auth.middleware'

Settings.defaultZone = process.env.TIME_ZONE ?? 'Asia/Shanghai'
const config: BlitzConfig = {
    middleware: [
        sessionMiddleware({
            cookiePrefix: 'fdbd',
            ...AuthMiddleware,
        }),
    ],
}
module.exports = config
