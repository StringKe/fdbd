import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'

import { theme } from './theme'

export function ThemeProvider({ children }: React.PropsWithChildren<unknown>) {
    return (
        <ChakraProvider resetCSS theme={theme}>
            {children}
        </ChakraProvider>
    )
}

export default ThemeProvider
