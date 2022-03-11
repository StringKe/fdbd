import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Handle, Node, Position } from 'react-flow-renderer'

import { getFieldType } from '../utils/to-flow'
import { ITableColumn, ITableNode } from './types'

function Column({ filed, isEven }: { filed: ITableColumn; isEven: boolean }) {
    const columnType = getFieldType(filed)

    return (
        <Flex
            pos={'relative'}
            as={'div'}
            py={2}
            px={4}
            backgroundColor={!isEven ? 'gray.200' : 'unset'}
        >
            <Box mr={4} flex={1} fontWeight={filed.pk ? 'bold' : 'unset'} color={'gray.600'}>
                {filed.name}
            </Box>
            <Box ml={4} textAlign={'right'} color={'gray.400'}>
                {columnType.type_name}
            </Box>
            <Handle
                type={'target'}
                position={Position.Left}
                id={`${filed.name}-target`}
                style={{ opacity: 0 }}
            />
            <Handle
                type={'source'}
                position={Position.Right}
                id={`${filed.name}-source`}
                style={{ opacity: 0 }}
            />
        </Flex>
    )
}

const TableNode = React.memo(({ data }: Node<ITableNode>) => {
    return (
        <Box
            pos={'relative'}
            bg={'white'}
            borderWidth={2}
            minWidth={'240px'}
            id={`D_${data?.name}`}
        >
            <Box
                backgroundColor={'blue.600'}
                fontSize={'24px'}
                lineHeight={'unset'}
                textTransform={'unset'}
                color={'white'}
                px={4}
                py={2}
                mx={'-2px'}
                mt={'-2px'}
            >
                {data?.name}
            </Box>
            <Box>
                {data?.fields.map((field, index) => {
                    return <Column key={index} filed={field} isEven={(index + 1) % 2 === 0} />
                })}
            </Box>
            <Handle
                type={'target'}
                position={Position.Top}
                id={`table-target`}
                style={{ opacity: 0 }}
            />
            <Handle
                type={'source'}
                position={Position.Bottom}
                id={`table-source`}
                style={{ opacity: 0 }}
            />
        </Box>
    )
})

export default TableNode
