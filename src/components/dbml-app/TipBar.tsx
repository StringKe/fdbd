import { Flex } from '@chakra-ui/react'

import { useRecoilState } from 'recoil'

import { _dbmlError } from './store'

export default function TipBar() {
    const [error] = useRecoilState(_dbmlError)
    return (
        <Flex
            width={'full'}
            minH={'18px'}
            height={'18px'}
            borderTopWidth={1}
            alignItems={'center'}
            px={4}
            fontSize={'13px'}
            lineHeight={'18px'}
            color={'white'}
            backgroundColor={error.length ? 'red.400' : 'white'}
        >
            {error}
        </Flex>
    )
}
