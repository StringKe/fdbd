import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from 'blitz'

import { User } from 'db'

import { UserRole } from './db/consts'

declare module 'blitz' {
    export interface Ctx extends DefaultCtx {
        session: SessionContext
    }

    export interface Session {
        isAuthorized: SimpleRolesIsAuthorized<UserRole[]>
        PublicData: {
            userId: User['id']
            userRoles: UserRole[]
        }
    }
}
