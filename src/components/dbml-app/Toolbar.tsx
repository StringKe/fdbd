import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react'
import Editor from '@monaco-editor/react'
import React from 'react'
import { FiChevronDown } from 'react-icons/fi'

import { ModelExporter, Parser } from '@dbml/core'
import { useRecoilState } from 'recoil'

import { dbmlRaw } from './store'

function SQLPreview() {
    const [dbmlStr] = useRecoilState(dbmlRaw)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [sqlType, setSqlType] = React.useState<'mysql' | 'postgres' | 'json' | 'mssql'>('mysql')
    const [sqlRaw, setSqlRaw] = React.useState('')

    React.useEffect(() => {
        if (dbmlRaw) {
            try {
                const database = Parser.parse(dbmlStr, 'dbml')
                const exportData = ModelExporter.export(database, sqlType, false)
                setSqlRaw(exportData)
            } catch (e) {
                setSqlRaw('解析错误')
            }
        }
    }, [sqlType, dbmlStr])

    return (
        <>
            <Button mr={2} onClick={onOpen}>
                SQL 预览
            </Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered size={'2xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>SQL 预览</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ButtonGroup isAttached variant='outline'>
                            <Button
                                colorScheme={sqlType === 'mysql' ? 'blue' : 'gray'}
                                onClick={() => setSqlType('mysql')}
                            >
                                Mysql
                            </Button>
                            <Button
                                colorScheme={sqlType === 'postgres' ? 'blue' : 'gray'}
                                onClick={() => setSqlType('postgres')}
                            >
                                Postgres
                            </Button>
                            <Button
                                colorScheme={sqlType === 'mssql' ? 'blue' : 'gray'}
                                onClick={() => setSqlType('mssql')}
                            >
                                MSSQL
                            </Button>
                            <Button
                                colorScheme={sqlType === 'json' ? 'blue' : 'gray'}
                                onClick={() => setSqlType('json')}
                            >
                                JSON
                            </Button>
                        </ButtonGroup>

                        <Box
                            mt={4}
                            width={'100%'}
                            height={'50vh'}
                            position={'relative'}
                            borderWidth={1}
                            padding={2}
                            borderRadius={4}
                        >
                            <Editor
                                height='100%'
                                language={
                                    sqlRaw === '解析错误'
                                        ? 'apex'
                                        : sqlType !== 'json'
                                        ? 'sql'
                                        : 'json'
                                }
                                value={sqlRaw}
                            />
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default function Toolbar() {
    return (
        <Flex
            width={'full'}
            minH={'64px'}
            height={'64px'}
            borderBottomWidth={2}
            alignItems={'center'}
            px={4}
        >
            <Menu>
                <MenuButton as={Button} rightIcon={<FiChevronDown />} mr={2}>
                    文件
                </MenuButton>
                <MenuList>
                    <MenuItem>下载</MenuItem>
                    <MenuItem>另存为</MenuItem>
                    <MenuItem>副本</MenuItem>
                    <MenuItem>删除</MenuItem>
                </MenuList>
            </Menu>

            <SQLPreview />
            <Button mr={2}>保存</Button>

            <HStack mx={'auto !important'}>
                <ButtonGroup isAttached variant='outline'>
                    <Button mr={'-px'}>撤回</Button>
                    <Button>重做</Button>
                </ButtonGroup>
            </HStack>

            <HStack>
                <Menu>
                    <Avatar as={MenuButton} size={'sm'} name={'青木'} />
                    <MenuList>
                        <MenuItem>下载</MenuItem>
                        <MenuItem>另存为</MenuItem>
                        <MenuItem>副本</MenuItem>
                        <MenuItem>删除</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Flex>
    )
}
