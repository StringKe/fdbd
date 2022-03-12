import { Parser } from '@dbml/core'
import Database, { RawDatabase } from '@dbml/core/types/model_structure/database'
import { get } from 'lodash'

export function parserDbmlStr(
    dbmlStr: string,
    type: 'mysql' | 'postgres' | 'dbml' | 'schemarb' | 'mssql' | 'json'
): [Database | undefined, string, any] {
    try {
        const database = Parser.parse(dbmlStr, type)
        return [database, '', undefined]
    } catch (e) {
        return [undefined, get(e, 'message', '解析错误'), e]
    }
}

export function parserDbmlStrToJSON(dbmlStr: string): [RawDatabase | undefined, string, any] {
    try {
        const database = Parser.parseDBMLToJSON(dbmlStr)
        return [database, '', undefined]
    } catch (e) {
        return [undefined, get(e, 'message', '解析错误'), e]
    }
}
