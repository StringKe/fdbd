import { NodeTypesType } from 'react-flow-renderer'

import EnumNode from './EnumNode'
import ErrorNode from './ErrorNode'
import TableNode from './TableNode'

export const nodeTypes: NodeTypesType = {
    table: TableNode,
    enum: EnumNode,
    error: ErrorNode,
}
