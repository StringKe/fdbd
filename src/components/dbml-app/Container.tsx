import { Flex } from '@chakra-ui/react'

import CodeEditor from './CodeEditor'
import CodePreview from './CodePreview'
import useMobile from './utils/useMobile'

export default function Container() {
    const isMobile = useMobile()
    return (
        <Flex flex={1} pos={'relative'} overflow={'hidden'} flexDir={isMobile ? 'column' : 'row'}>
            <CodeEditor />
            <CodePreview />
        </Flex>
    )
}
