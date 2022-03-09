import { Box } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import BaseLayout from './BaseLayout'

export default function CleanLayout({ children }: PropsWithChildren<unknown>) {
    return (
        <BaseLayout>
            <Box data-testid={'clean-layout'}>{children}</Box>
        </BaseLayout>
    )
}
