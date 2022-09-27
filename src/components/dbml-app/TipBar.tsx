import { Flex } from '@chakra-ui/react'

import { useRecoilState } from 'recoil'

import { _dbmlError } from './store'

export default function TipBar() {
    const [error] = useRecoilState(_dbmlError)

    return (
        <Flex
            width={'full'}
            minH={'24px'}
            height={'24px'}
            borderTopWidth={1}
            alignItems={'center'}
            px={4}
            color={'black'}
            backgroundColor={error.length ? 'red.400' : 'white'}
        >
            <Flex fontSize={'13px'} lineHeight={'18px'}>
                <Flex mr={4}>状态</Flex>
                <Flex>{error || '运行中'}</Flex>
            </Flex>

            <Flex ml={'auto'} fontSize={'14px'}>
                <a href={'https://beian.miit.gov.cn/'}>粤ICP备2021117808号</a>
            </Flex>
        </Flex>
    )
}
