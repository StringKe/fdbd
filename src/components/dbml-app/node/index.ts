import { NodeTypesType } from 'react-flow-renderer'

import EnumNode from './EnumNode'
import TableNode from './TableNode'

export const nodeTypes: NodeTypesType = {
    table: TableNode,
    enum: EnumNode,
}
