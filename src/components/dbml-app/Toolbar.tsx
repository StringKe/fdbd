import { Button, Flex, HStack, VStack } from '@chakra-ui/react'
import React from 'react'

import FileMenu from './components/FileMenu'
import GithubSourceButton from './components/GithubSourceButton'
import OnlineButton from './components/OnlineButton'
import SqlPreview from './components/SqlPreview'
import useMobile from './utils/useMobile'

function PCToolbar() {
    return (
        <Flex
            width={'full'}
            minH={'64px'}
            height={'64px'}
            borderBottomWidth={2}
            alignItems={'center'}
            px={4}
        >
            <FileMenu mr={2} />
            <SqlPreview />

            <HStack ml={'auto !important'}>
                <OnlineButton />

                <GithubSourceButton />
            </HStack>
        </Flex>
    )
}

function MobileToolbar() {
    return (
        <Flex width={'full'} borderBottomWidth={2} alignItems={'center'} p={2}>
            <VStack width={'full'}>
                <HStack w={'full'}>
                    <FileMenu />
                </HStack>

                <HStack w={'full'}>
                    <Button flex={1}>保存</Button>
                    <SqlPreview flex={1} />
                </HStack>

                <HStack w={'full'}>
                    <Button flex={1}>撤回</Button>
                    <Button flex={1}>重做</Button>
                </HStack>
            </VStack>
        </Flex>
    )
}

export default function Toolbar() {
    const isMobile = useMobile()

    return !isMobile ? <PCToolbar /> : <MobileToolbar />
}
