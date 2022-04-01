import { enhancePrisma } from 'blitz'

import { PrismaClient } from '@prisma/client/generated'

const EnhancedPrisma = enhancePrisma(PrismaClient)

export * from '@prisma/client/generated'
const db = new EnhancedPrisma()
export default db
