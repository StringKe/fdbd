import { Box } from '@chakra-ui/react'
import Editor, { OnMount } from '@monaco-editor/react'
import React from 'react'

import { Parser as DBMLParser } from '@dbml/core'
import { useMount } from 'ahooks'
import { get } from 'lodash'
import { editor } from 'monaco-editor'
import { useRecoilState } from 'recoil'

import { dbmlError, dbmlRaw, dbmlStore } from './store'

export default function CodeEditor() {
    const editorRef = React.useRef<editor.IStandaloneCodeEditor>()
    const [, setDbml] = useRecoilState(dbmlStore)
    const [dbmlStr, setDbmlStr] = useRecoilState(dbmlRaw)
    const [, setError] = useRecoilState(dbmlError)

    const handleEditorDidMount = React.useCallback<OnMount>((editor, _) => {
        editorRef.current = editor
    }, [])

    const handleEditorChange = React.useCallback(
        (value: string | undefined) => {
            if (value) {
                try {
                    const data = DBMLParser.parseDBMLToJSON(value)
                    setDbml(data)
                    setError('')
                } catch (e) {
                    const message = get(e, 'message', '')
                    setError(message)
                    console.log('解析错误', e)
                }
            }
            setDbmlStr(value ?? '')
        },
        [setDbml, setDbmlStr, setError]
    )

    useMount(() => {
        // 如果初次第一次挂载的内容不为空则尝试更新内容。
        if (dbmlStr.length > 1) {
            handleEditorChange(dbmlStr)
        }
    })

    return (
        <Box flex={1} pos={'relative'} borderRightWidth={1}>
            <Editor
                height='100%'
                defaultLanguage='apex'
                defaultValue={dbmlStr}
                onMount={handleEditorDidMount}
                onChange={handleEditorChange}
            />
        </Box>
    )
}
