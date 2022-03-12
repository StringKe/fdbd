import {
    Alert,
    AlertIcon,
    Button,
    ButtonProps,
    Input,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Tag,
    TagProps,
    Text,
    UnorderedList,
    useDisclosure,
    Wrap,
    WrapItem,
} from '@chakra-ui/react'
import React from 'react'

import { useRecoilState, useRecoilValue } from 'recoil'

import { _onlineCheck, _onlineTitle } from '../store'

export default function OnlineButton(props: ButtonProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isOnline] = useRecoilState(_onlineCheck)
    const onlineTitle = useRecoilValue(_onlineTitle)
    const onConnect = React.useCallback(() => {}, [])
    const fullFeatures: { type: TagProps['colorScheme']; text: string }[] = [
        { type: 'gray', text: '☁️ 云端记录' },
        { type: 'red', text: '团队管理' },
        { type: 'gray', text: '在线文档' },
        { type: 'yellow', text: '多人协同' },
        { type: 'blue', text: '数据库执行器' },
        { type: 'gray', text: 'Webhook 支持' },
        { type: 'green', text: '版本记录' },
        { type: 'gray', text: '语言实体生成' },
        { type: 'gray', text: '自动生成测试数据' },
        { type: 'gray', text: '差异生成以及对比' },
        { type: 'facebook', text: 'Git 仓库支持' },
        { type: 'twitter', text: '...更多特性' },
    ]

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
                    <ModalBody>
                        <Alert status='warning'>
                            <AlertIcon />
                            开发中，暂未上线
                        </Alert>
                        <Input mt={4} placeholder='后端地址' />
                        <Text color={'gray.700'} fontSize={'16px'} pt={2} textAlign={'center'}>
                            当连接后端后拥有以下功能
                        </Text>
                        <Wrap mt={2} justify={'center'} spacing='4'>
                            {fullFeatures.map((item, index) => {
                                return (
                                    <WrapItem key={index}>
                                        <Tag colorScheme={item.type}>{item.text}</Tag>
                                    </WrapItem>
                                )
                            })}
                        </Wrap>

                        <UnorderedList mt={4} color={'gray.500'} fontSize={'14px'}>
                            <ListItem>
                                语言实体生成：支持生成 Java Php Go Rust 等常用数据库实体/类型
                            </ListItem>
                            <ListItem>多人协同：支持同时多人共同设计</ListItem>
                            <ListItem>数据库执行器：在线调试 SQL 语句</ListItem>
                        </UnorderedList>
                    </ModalBody>
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
