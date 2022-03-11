import { Box } from '@chakra-ui/react'
import Editor, { OnChange, OnMount } from '@monaco-editor/react'
import React from 'react'

import { Parser as DBMLParser } from '@dbml/core'
import { get } from 'lodash'
import { useRecoilState } from 'recoil'

import { dbmlError, dbmlRaw, dbmlStore } from './store'

export default function CodeEditor() {
    const editorRef = React.useRef(null)
    const [, setDbml] = useRecoilState(dbmlStore)
    const [dbmlStr, setDbmlStr] = useRecoilState(dbmlRaw)
    const [, setError] = useRecoilState(dbmlError)

    const handleEditorDidMount = React.useCallback<OnMount>((editor, monaco) => {
        editorRef.current = editor
    }, [])

    const handleEditorChange = React.useCallback<OnChange>(
        (value) => {
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
