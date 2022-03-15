import { memo } from 'react'
import { EdgeProps, getMarkerEnd, Node, useStoreState } from 'react-flow-renderer'

import { getPath, PointInfo } from './getPath'

interface PathFindingEdgeProps extends EdgeProps {
    storeNodes: Node[]
}

const PathFindingEdge = memo(
    ({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        arrowHeadType,
        markerEndId,
        style,
        storeNodes,
    }: PathFindingEdgeProps) => {
        const gridRatio = 20
        const nodePadding = 20

        const source: PointInfo = {
            x: sourceX,
            y: sourceY,
            position: sourcePosition,
        }

        const target: PointInfo = {
            x: targetX,
            y: targetY,
            position: targetPosition,
        }

        const edgePath = getPath({ storeNodes, source, target, gridRatio, nodePadding })
        const markerEnd = getMarkerEnd(arrowHeadType, markerEndId)

        return (
            <path
                style={style}
                className='react-flow__edge-path'
                d={edgePath}
                markerEnd={markerEnd}
            />
        )
    }
)

export const SmartEdge = memo((props: EdgeProps) => {
    const storeNodes = useStoreState((state) => state.nodes)
    return <PathFindingEdge storeNodes={storeNodes} {...props} />
})
