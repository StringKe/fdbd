import { Button, ButtonProps, useToast } from '@chakra-ui/react'

import { get } from 'lodash'
import { useRecoilState } from 'recoil'

import { _dbmlRaw } from '../store'
import useReadFile from '../utils/useReadFile'

export default function LoadFileButton(props: ButtonProps) {
    const toast = useToast()
    const [, setDbmlStr] = useRecoilState(_dbmlRaw)
    const onClick = useReadFile((file) => {
        file.text()
            .then((textContent) => {
                setDbmlStr(textContent)
            })
            .catch((err) => {
                toast({
                    status: 'error',
                    title: '错误',
                    description: get(err, 'message', '读取文件失败'),
                })
            })
    })
    return (
        <Button {...props} onClick={onClick}>
            从文件加载
        </Button>
    )
}
