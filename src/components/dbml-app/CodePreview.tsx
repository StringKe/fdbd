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

import { useSize } from 'ahooks'
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
    React.useEffect(() => {
        flowHelper.fitView()
    }, [flowHelper, size])

    const changeLayout = React.useCallback(
        (direction) => {
            setDirection(direction)
            const layoutedElements = CalcLayout(elements, direction, zoom)
            setElements(layoutedElements)
            setTimeout(() => {
                flowHelper.fitView()
            }, 50)
        },
        [flowHelper, elements, zoom]
    )

    const onConnect = React.useCallback((params) => setElements((els) => addEdge(params, els)), [])

    React.useEffect(() => {
        if (dbml) {
            const elements = toFlow(dbml)
            const layoutedElements = CalcLayout(elements, direction, zoom)
            setElements(layoutedElements)
            setTimeout(() => {
                flowHelper.fitView()
            }, 50)
        }
    }, [dbml, direction, flowHelper, zoom])

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
                    <ControlButton onClick={() => changeLayout('TB')}>V</ControlButton>
                    <ControlButton onClick={() => changeLayout('LR')}>H</ControlButton>
                </Controls>
            </ReactFlow>
        </Box>
    )
}
