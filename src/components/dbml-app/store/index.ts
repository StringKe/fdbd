import { RawDatabase } from '@dbml/core/types/model_structure/database'
import { atom } from 'recoil'

import { TestDBML } from '../test-dbml'

export const dbmlRaw = atom<string>({
    key: 'dbmlRaw',
    default: TestDBML,
})

export const dbmlStore = atom<RawDatabase | undefined>({
    key: 'dbmlStore',
    default: undefined,
})

export const dbmlError = atom<string>({
    key: 'dbmlError',
    default: '',
})
