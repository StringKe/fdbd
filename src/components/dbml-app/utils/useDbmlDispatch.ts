import React from 'react'

import { useRecoilState } from 'recoil'

import { _dbmlError, _dbmlRaw, _dbmlStore } from '../store'
import { parserDbmlStrToJSON } from './dbml-utils'

export default function useDbmlDispatch() {
    const [, setDbml] = useRecoilState(_dbmlStore)
    const [, setDbmlStr] = useRecoilState(_dbmlRaw)
    const [, setError] = useRecoilState(_dbmlError)
    return React.useCallback(
        (value: string | undefined) => {
            if (value) {
                const [database, errMessage] = parserDbmlStrToJSON(value)
                setDbml(database)
                setError(errMessage)
            }
            setDbmlStr(value ?? '')
        },
        [setDbml, setDbmlStr, setError]
    )
}
