import { Box } from '@chakra-ui/react'
import Editor, { OnChange, OnMount } from '@monaco-editor/react'
import React from 'react'

import { Parser as DBMLParser } from '@dbml/core'
import { useRecoilState } from 'recoil'

import { dbmlRaw, dbmlStore } from './store'

export default function CodeEditor() {
    const editorRef = React.useRef(null)
    const [, setDbml] = useRecoilState(dbmlStore)
    const [dbmlStr, setDbmlStr] = useRecoilState(dbmlRaw)

    const handleEditorDidMount = React.useCallback<OnMount>((editor, monaco) => {
        editorRef.current = editor
    }, [])

    const handleEditorChange = React.useCallback<OnChange>(
        (value) => {
            if (value) {
                try {
                    const data = DBMLParser.parseDBMLToJSON(value)
                    setDbml(data)
                } catch (e) {
                    console.log('解析错误', e)
                }
            }
            setDbmlStr(value ?? '')
        },
        [setDbml, setDbmlStr]
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
