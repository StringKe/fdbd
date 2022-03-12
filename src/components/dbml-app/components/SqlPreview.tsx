import {
    Box,
    Button,
    ButtonGroup,
    ButtonProps,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useClipboard,
    useDisclosure,
} from '@chakra-ui/react'
import Editor from '@monaco-editor/react'
import React from 'react'

import { ModelExporter } from '@dbml/core'
import { useRecoilState } from 'recoil'

import { _dbmlRaw } from '../store'
import { parserDbmlStr } from '../utils/dbml-utils'

export default function SqlPreview(props: ButtonProps) {
    const [dbmlStr] = useRecoilState(_dbmlRaw)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [sqlType, setSqlType] = React.useState<'mysql' | 'postgres' | 'json' | 'mssql'>('mysql')
    const [sqlRaw, setSqlRaw] = React.useState('')

    const { hasCopied, onCopy } = useClipboard(sqlRaw)

    React.useEffect(() => {
        if (dbmlStr) {
            const [database, errMessage] = parserDbmlStr(dbmlStr, 'dbml')
            if (database) {
                const exportData = ModelExporter.export(database, sqlType, false)
                setSqlRaw(exportData)
            } else {
                setSqlRaw(`解析错误 ${errMessage}`)
            }
        }
    }, [sqlType, dbmlStr])

    return (
        <>
            <Button mr={2} onClick={onOpen} {...props}>
                SQL 预览
            </Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered size={'3xl'}>
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
                    <ModalFooter>
                        <Button onClick={onCopy} ml={2}>
                            {hasCopied ? '已复制' : '复制'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
