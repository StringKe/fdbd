import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react'
import React from 'react'
import { Node } from 'react-flow-renderer'

import { useRecoilState } from 'recoil'

import { _dbmlError } from '../store'

const ErrorNode = React.memo(({ data }: Node<{ name: string }>) => {
    const [errMessage] = useRecoilState(_dbmlError)
    return (
        <Box
            pos={'relative'}
            bg={'white'}
            borderWidth={2}
            minWidth={'240px'}
            id={`D_${data?.name}`}
        >
            <Alert status='error'>
                <AlertIcon />
                <AlertTitle mr={2}>无法解析 DBML</AlertTitle>
                <AlertDescription>{errMessage}</AlertDescription>
            </Alert>
        </Box>
    )
})

export default ErrorNode
