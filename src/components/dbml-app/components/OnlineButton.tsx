import {
    Button,
    ButtonProps,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react'
import React from 'react'

import { useRecoilState, useRecoilValue } from 'recoil'

import { _onlineCheck, _onlineTitle } from '../store'

export default function OnlineButton(props: ButtonProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isOnline] = useRecoilState(_onlineCheck)
    const onlineTitle = useRecoilValue(_onlineTitle)
    const onConnect = React.useCallback(() => {}, [])

    return (
        <>
            <Button mr={2} onClick={onOpen} {...props}>
                {!isOnline ? '离线模式' : `已链接 ${onlineTitle}`}
            </Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>后端链接</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>暂未开放</ModalBody>
                    <ModalFooter>
                        <Button onClick={onConnect} ml={2}>
                            连接
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
