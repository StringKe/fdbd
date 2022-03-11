import { Flex, useBreakpoint } from '@chakra-ui/react'

import CodeEditor from './CodeEditor'
import CodePreview from './CodePreview'

export default function Container() {
    const flexDir = useBreakpoint()

    return (
        <Flex
            flex={1}
            pos={'relative'}
            overflow={'hidden'}
            flexDir={['sm', 'md'].includes(flexDir as never) ? 'column' : 'row'}
        >
            <CodeEditor />
            <CodePreview />
        </Flex>
    )
}
