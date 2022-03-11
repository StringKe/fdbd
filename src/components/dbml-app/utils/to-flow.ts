import { ArrowHeadType, ConnectionLineType, Elements } from 'react-flow-renderer'

import { RawDatabase } from '@dbml/core/types/model_structure/database'
import { get } from 'lodash'

import { ITableColumn } from '../node/types'

export function getFieldType(field: ITableColumn) {
    return get(field, 'type', {
        type_name: '',
        args: null,
    }) as { type_name: string; args: any }
}

export default function toFlow(dbml: RawDatabase, isSmart = false): Elements {
    const result: Elements = []
    const fullEnumNames = dbml.enums.map((i) => i.name)
    const fullNodeNames: string[] = [...dbml.tables.map((i) => i.name), ...fullEnumNames]
    const aliasNameObject = dbml.tables.reduce<Record<string, string>>((result, i) => {
        if (i.alias != null) {
            result[i.alias] = i.name
        }
        return result
    }, {})
    const aliasNames = Object.keys(aliasNameObject)

    function getTableName(name: string) {
        return aliasNames.includes(name) ? aliasNameObject[name] : name
    }

    const allRefs = dbml.refs
        .map(({ endpoints: [to, from] }) => {
            return from.fieldNames.map((fieldName, index) => {
                return {
                    from: { ...from, fieldNames: fieldName },
                    to: { ...to, fieldNames: to.fieldNames[index] },
                }
            })
        })
        .flat()

    dbml.enums.forEach((enumItem) => {
        result.push({
            position: { x: 0, y: 0 },
            id: enumItem.name,
            type: 'enum',
            data: enumItem,
            connectable: false,
            selectable: false,
            draggable: true,
        })
    })

    dbml.tables.forEach((table) => {
        result.push({
            position: { x: 0, y: 0 },
            id: table.name,
            type: 'table',
            data: table,
            connectable: false,
            selectable: false,
            draggable: true,
        })

        table.fields.forEach((field) => {
            const type = getFieldType(field)
            if (fullNodeNames.includes(type.type_name)) {
                const enumName = type.type_name
                result.push({
                    id: ``,
                    source: table.name,
                    sourceHandle: `${field.name}-source`,
                    target: enumName,
                    targetHandle: 'table-target',
                    type: ConnectionLineType.SmoothStep,
                    animated: false,
                })
            }
        })
    })

    allRefs.forEach(({ from, to }) => {
        const source = getTableName(from.tableName)
        const target = getTableName(to.tableName)

        const sourceHandle = `${from.fieldNames}-source`
        const targetHandle = `${to.fieldNames}-target`

        result.push({
            id: `${source}-${sourceHandle}.${target}-${targetHandle}`,
            source,
            target,
            sourceHandle,
            targetHandle,
            type: !isSmart ? ConnectionLineType.SmoothStep : 'smart',
            arrowHeadType: ArrowHeadType.ArrowClosed,
            animated: false,
        })
    })

    return result
}
