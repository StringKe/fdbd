import { RawDatabase } from '@dbml/core/types/model_structure/database'
import { atom } from 'recoil'

import { TestDBML } from '../test-dbml'

export * from './online-mod'

export const _dbmlRaw = atom<string>({
    key: 'dbmlRaw',
    default: TestDBML,
})

export const _dbmlStore = atom<RawDatabase | undefined>({
    key: 'dbmlStore',
    default: undefined,
})

export const _dbmlError = atom<string>({
    key: 'dbmlError',
    default: '',
})
