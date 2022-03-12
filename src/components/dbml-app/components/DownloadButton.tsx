import { Button, ButtonProps, useToast } from '@chakra-ui/react'
import React from 'react'

import { get } from 'lodash'
import { useRecoilState } from 'recoil'

import { _dbmlRaw } from '../store'
import { parserDbmlStrToJSON } from '../utils/dbml-utils'
import useDownload from '../utils/useDownload'

export function useDbmlDownload() {
    const [dbmlStr] = useRecoilState(_dbmlRaw)
    const [database, errMessage] = parserDbmlStrToJSON(dbmlStr)
    const fileName = `${get(database, 'name', 'fdbd-database-schema')}.dbml`
    const onDownload = useDownload(dbmlStr, fileName)
    const toast = useToast()

    return React.useCallback(() => {
        onDownload()
        const hasErrMessage = errMessage && errMessage.length > 1
        toast({
            title: '下载完成',
            description: `${
                hasErrMessage ? `！！！ 当前设计存在解析问题` : '.dbml 文件可以使用文本编辑器打开'
            }`,
            variant: 'solid',
            status: hasErrMessage ? 'warning' : 'success',
        })
    }, [onDownload, toast, errMessage])
}

export default function DownloadButton(props: ButtonProps) {
    const onClick = useDbmlDownload()

    return (
        <Button onClick={onClick} {...props}>
            下载
        </Button>
    )
}
