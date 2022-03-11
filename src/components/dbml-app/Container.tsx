import { Flex } from '@chakra-ui/react'

import CodeEditor from './CodeEditor'
import CodePreview from './CodePreview'

export default function Container() {
    return (
        <Flex flex={1} pos={'relative'} overflow={'hidden'}>
            <CodeEditor />
            <CodePreview />
        </Flex>
    )
}
