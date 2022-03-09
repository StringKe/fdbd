import { Box } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import BaseLayout from './BaseLayout'

function DefaultLayoutHeader() {
    return (
        <Box h={'64px'} data-testid={'default-layout-header'}>
            Header
        </Box>
    )
}

function DefaultLayoutFooter() {
    return (
        <Box py={4} data-testid={'default-layout-footer'}>
            Footer
        </Box>
    )
}

export default function DefaultLayout({ children }: PropsWithChildren<unknown>) {
    return (
        <BaseLayout>
            <DefaultLayoutHeader />
            <Box>{children}</Box>
            <DefaultLayoutFooter />
        </BaseLayout>
    )
}
