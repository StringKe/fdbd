import { Elements, isNode, Position } from 'react-flow-renderer'

import dagre from 'dagre'

import { ITableColumn, ITableNode } from '../node/types'

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const nodeWidth = 240
const nodeHeight = 240

export default function layout(
    elements: Elements<ITableNode | ITableColumn>,
    direction = 'TB',
    zoom: number = 1
) {
    const isHorizontal = direction === 'LR'
    dagreGraph.setGraph({
        rankdir: direction,
        ranker: 'tight-tree',
        align: 'DR',
    })

    elements.forEach((el) => {
        if (isNode(el)) {
            if (window) {
                const data = el.data
                if (data) {
                    const targetElement = document.getElementById(`D_${data.name}`)
                    if (targetElement) {
                        const boundingClientRect = targetElement.getBoundingClientRect()

                        dagreGraph.setNode(el.id, {
                            width: boundingClientRect.width / zoom,
                            height: boundingClientRect.height / zoom,
                        })
                        return
                    }
                }
            }
            dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight })
        } else {
            dagreGraph.setEdge(el.source, el.target)
        }
    })

    dagre.layout(dagreGraph)

    return elements.map((el) => {
        if (isNode(el)) {
            const nodeWithPosition = dagreGraph.node(el.id)
            el.targetPosition = isHorizontal ? Position.Left : Position.Top
            el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom

            el.position = {
                x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
                y: nodeWithPosition.y - nodeHeight / 2,
            }
        }

        return el
    })
}
