import { AuthenticationError, Ctx, PublicData, SessionModel } from 'blitz'

import { isEmpty } from 'lodash'
import { DateTime } from 'luxon'
import { SessionConfig } from 'next/dist/shared/lib/utils'

import { UserRole } from '../../db/consts'
import { getAuthProvider } from './getAuthProvider'

export const AuthMiddleware: SessionConfig = {
    isAuthorized(data: { ctx: Ctx; args?: UserRole[] }) {
        const {
            ctx: {
                session: {
                    $publicData: { userId, userRoles },
                },
            },
            args: roles,
        } = data

        const savedRoles = userRoles || []

        if (userId === undefined) {
            throw new AuthenticationError('未登陆')
        }

        if (roles === undefined || isEmpty(roles)) {
            return true
        }

        if (savedRoles.includes(UserRole.ADMIN)) {
            return true
        }

        for (const role of roles) {
            if (savedRoles.includes(role)) return true
        }

        return false
    },
    async createSession(session: SessionModel): Promise<SessionModel> {
        const expSec = DateTime.fromJSDate(session.expiresAt ?? new Date())
            .diffNow()
            .as('seconds')

        await getAuthProvider().createData(
            session.handle,
            session,
            expSec,
            session.userId ? String(session.userId) : undefined
        )

        return session
    },
    async deleteSession(handle: string): Promise<SessionModel> {
        await getAuthProvider().deleteData(handle)
        return { handle }
    },
    async getSession(handle: string): Promise<SessionModel | null> {
        const saved = await getAuthProvider().getData(handle)
        return saved ? (saved.data as SessionModel) : null
    },
    async getSessions(userId: PublicData['userId']): Promise<SessionModel[]> {
        const saved = await getAuthProvider().getDatas(String(userId))
        return saved.map((s) => s.data as SessionModel)
    },
    async updateSession(handle: string, session: Partial<SessionModel>): Promise<SessionModel> {
        const data = await getAuthProvider().updateData(
            handle,
            session,
            session.userId ? String(session.userId) : undefined
        )
        return data.data as SessionModel
    },
}
