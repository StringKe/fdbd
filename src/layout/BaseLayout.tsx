import { Box } from '@chakra-ui/react'
import React from 'react'

export default function BaseLayout({ children }: React.PropsWithChildren<unknown>) {
    return (
        <Box data-testid={'base-layout'} pos={'relative'} minW={'100vw'} minH={'100vh'}>
            {children}
        </Box>
    )
}
