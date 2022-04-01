import { Box, ChakraProvider } from '@chakra-ui/react'

import {
    AppProps,
    AuthenticationError,
    AuthorizationError,
    ErrorBoundary,
    ErrorComponent,
    ErrorFallbackProps,
    useQueryErrorResetBoundary,
} from 'blitz'

export default function App({ Component, pageProps }: AppProps) {
    const getLayout = Component.getLayout || ((page) => page)

    return (
        <ChakraProvider>
            <ErrorBoundary
                FallbackComponent={RootErrorFallback}
                onReset={useQueryErrorResetBoundary().reset}
            >
                {getLayout(<Component {...pageProps} />)}
            </ErrorBoundary>
        </ChakraProvider>
    )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
    if (error instanceof AuthenticationError) {
        return <Box>test</Box>
    } else if (error instanceof AuthorizationError) {
        return (
            <ErrorComponent
                statusCode={error.statusCode}
                title='Sorry, you are not authorized to access this'
            />
        )
    } else {
        return (
            <ErrorComponent
                statusCode={error.statusCode || 400}
                title={error.message || error.name}
            />
        )
    }
}
