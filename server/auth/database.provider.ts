import { DateTime } from 'luxon'

import db from '../../db'
import { Data, DataProvider, ReturnData } from './provider'

export class DatabaseProvider extends DataProvider {
    async createData(
        dataId: string,
        data: Data,
        expiredAt?: number,
        userId?: string
    ): Promise<ReturnData> {
        const jsonData = JSON.stringify(data)

        let user
        if (userId) {
            user = { connect: { id: userId } }
        }

        const saved = await db.session.create({
            data: {
                handle: dataId,
                data: jsonData,
                userId: undefined,
                expiresAt: DateTime.now().plus({ seconds: expiredAt }).toJSDate(),
                user,
            },
        })
        return {
            data: data,
            userId: String(saved.userId) ?? null,
            dataId: saved.handle,
        }
    }

    async deleteData(dataId: string): Promise<ReturnData | null> {
        try {
            const deleted = await db.session.delete({
                where: {
                    handle: dataId,
                },
            })
            return {
                data: {},
                dataId: deleted.handle,
                userId: String(deleted.userId) ?? null,
            }
        } catch (e) {
            return null
        }
    }

    async getData(dataId: string): Promise<ReturnData | null> {
        const session = await db.session.findFirst({
            where: {
                handle: dataId,
            },
        })
        if (!session) {
            return null
        }
        return {
            data: JSON.parse(session.data),
            dataId: session.handle,
            userId: String(session.userId) ?? null,
        }
    }

    async getDatas(userId: string): Promise<ReturnData[]> {
        const sessions = await db.session.findMany({
            where: {
                userId: Number(userId),
            },
        })
        return sessions
            .map((session) => ({
                data: JSON.parse(session.data),
                dataId: session.handle,
                userId: String(userId) ?? null,
            }))
            .filter(Boolean)
    }

    async updateData(dataId: string, data: Data, userId?: string | null): Promise<ReturnData> {
        const jsonData = JSON.stringify(data)

        const updated = await db.session.update({
            data: {
                data: jsonData,
            },
            where: {
                handle: dataId,
            },
        })
        return {
            data: data,
            dataId: updated.handle,
            userId: String(updated.userId) ?? null,
        }
    }
}
