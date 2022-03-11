import { Box, useToken } from '@chakra-ui/react'
import React from 'react'
import ReactFlow, {
    addEdge,
    Background,
    BackgroundVariant,
    ConnectionLineType,
    ControlButton,
    Controls,
    Elements,
    MiniMap,
    useStoreState,
    useZoomPanHelper,
} from 'react-flow-renderer'

import { useDebounceFn, useSize } from 'ahooks'
import { useRecoilState } from 'recoil'

import { nodeTypes } from './node'
import { dbmlStore } from './store'
import { default as CalcLayout } from './utils/layout'
import toFlow from './utils/to-flow'

export default function CodePreview() {
    const ref = React.useRef<HTMLDivElement>(null)
    const [dbml] = useRecoilState(dbmlStore)
    const [elements, setElements] = React.useState<Elements>([])
    const size = useSize(ref)
    const flowHelper = useZoomPanHelper()
    const [, , zoom] = useStoreState((state) => state.transform)
    const [direction, setDirection] = React.useState('TB')
    const activityColor = useToken('colors', 'blue.100')

    const updateLayout = React.useCallback(
        (dir?: string) => {
            const layoutedElements = CalcLayout(elements, dir, zoom)
            setElements(layoutedElements)
            setTimeout(() => {
                flowHelper.fitView()
            }, 50)
        },
        [elements, flowHelper, zoom]
    )

    const { run: updateLayoutByDbmlChange } = useDebounceFn(
        () => {
            updateLayout(direction)
        },
        { wait: 200 }
    )

    React.useEffect(() => {
        flowHelper.fitView()
    }, [flowHelper, size])

    const changeLayout = React.useCallback(
        (direction) => {
            setDirection(direction)
            updateLayout(direction)
        },
        [updateLayout]
    )

    const onConnect = React.useCallback((params) => setElements((els) => addEdge(params, els)), [])

    React.useEffect(() => {
        if (dbml) {
            const elements = toFlow(dbml)
            setElements(elements)
            updateLayoutByDbmlChange()
        }
    }, [dbml, updateLayoutByDbmlChange])

    return (
        <Box ref={ref} flex={1} pos={'relative'} borderLeftWidth={1} overflow={'hidden'}>
            <ReactFlow
                elements={elements}
                nodeTypes={nodeTypes}
                connectionLineType={ConnectionLineType.SmoothStep}
                onConnect={onConnect}
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={20}
                    size={2}
                    color={useToken('colors', 'gray.100')}
                />
                <MiniMap
                    nodeBorderRadius={6}
                    nodeStrokeColor={useToken('colors', 'gray.700')}
                    nodeColor={useToken('colors', 'gray.300')}
                    nodeStrokeWidth={4}
                    maskColor={useToken('colors', 'gray.200')}
                />
                <Controls>
                    <ControlButton
                        style={{
                            backgroundColor: direction === 'TB' ? activityColor : '#fefefe',
                        }}
                        onClick={() => changeLayout('TB')}
                    >
                        V
                    </ControlButton>
                    <ControlButton
                        style={{
                            backgroundColor: direction === 'LR' ? activityColor : '#fefefe',
                        }}
                        onClick={() => changeLayout('LR')}
                    >
                        H
                    </ControlButton>
                </Controls>
            </ReactFlow>
        </Box>
    )
}
