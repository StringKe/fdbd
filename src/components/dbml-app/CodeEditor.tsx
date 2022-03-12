import { Box } from '@chakra-ui/react'
import Editor, { OnMount } from '@monaco-editor/react'
import React from 'react'

import { useMount } from 'ahooks'
import { editor } from 'monaco-editor'
import { useRecoilState } from 'recoil'

import { _dbmlRaw } from './store'
import useDbmlDispatch from './utils/useDbmlDispatch'

export default function CodeEditor() {
    const editorRef = React.useRef<editor.IStandaloneCodeEditor>()
    const [dbmlStr] = useRecoilState(_dbmlRaw)

    const handleEditorDidMount = React.useCallback<OnMount>((editor, _) => {
        editorRef.current = editor
    }, [])

    const handleEditorChange = useDbmlDispatch()

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
                language='apex'
                value={dbmlStr}
                onMount={handleEditorDidMount}
                onChange={handleEditorChange}
            />
        </Box>
    )
}
