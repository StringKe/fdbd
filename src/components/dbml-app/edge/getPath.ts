import type { Node, Position, XYPosition } from 'react-flow-renderer'

import { DiagonalMovement, Grid, JumpPointFinder } from 'pathfinding'

export type PointInfo = {
    x: number
    y: number
    position: Position
}

type Direction = 'top' | 'bottom' | 'left' | 'right'

type BoundingBox = {
    topLeft: XYPosition
    bottomLeft: XYPosition
    topRight: XYPosition
    bottomRight: XYPosition
}

type NodeBoundingBox = BoundingBox & {
    id: string
    width: number
    height: number
}

type GraphBoundingBox = BoundingBox & {
    width: number
    height: number
    xMax: number
    yMax: number
    xMin: number
    yMin: number
}

const round = (x: number, multiple = 10) => Math.round(x / multiple) * multiple
const roundDown = (x: number, multiple = 10) => Math.floor(x / multiple) * multiple
const roundUp = (x: number, multiple = 10) => Math.ceil(x / multiple) * multiple

const getBoundingBoxes = (storeNodes: Node[], nodePadding = 2, roundTo = 2) => {
    let xMax = Number.MIN_SAFE_INTEGER
    let yMax = Number.MIN_SAFE_INTEGER
    let xMin = Number.MAX_SAFE_INTEGER
    let yMin = Number.MAX_SAFE_INTEGER

    const nodes: NodeBoundingBox[] = storeNodes.map((node) => {
        const rf = node?.__rf
        const width = Math.max(rf?.width || 0, 1)
        const height = Math.max(rf?.height || 0, 1)

        const position: XYPosition = {
            x: rf?.position?.x || 0,
            y: rf?.position?.y || 0,
        }

        const topLeft: XYPosition = {
            x: position.x - nodePadding,
            y: position.y - nodePadding,
        }

        const bottomLeft: XYPosition = {
            x: position.x - nodePadding,
            y: position.y + height + nodePadding,
        }

        const topRight: XYPosition = {
            x: position.x + width + nodePadding,
            y: position.y - nodePadding,
        }

        const bottomRight: XYPosition = {
            x: position.x + width + nodePadding,
            y: position.y + height + nodePadding,
        }

        if (roundTo > 0) {
            topLeft.x = roundDown(topLeft.x, roundTo)
            topLeft.y = roundDown(topLeft.y, roundTo)
            bottomLeft.x = roundDown(bottomLeft.x, roundTo)
            bottomLeft.y = roundUp(bottomLeft.y, roundTo)
            topRight.x = roundUp(topRight.x, roundTo)
            topRight.y = roundDown(topRight.y, roundTo)
            bottomRight.x = roundUp(bottomRight.x, roundTo)
            bottomRight.y = roundUp(bottomRight.y, roundTo)
        }

        if (topLeft.y < yMin) {
            yMin = topLeft.y
        }

        if (topLeft.x < xMin) {
            xMin = topLeft.x
        }

        if (bottomRight.y > yMax) {
            yMax = bottomRight.y
        }

        if (bottomRight.x > xMax) {
            xMax = bottomRight.x
        }

        return {
            id: node.id,
            width,
            height,
            topLeft,
            bottomLeft,
            topRight,
            bottomRight,
        }
    })

    const graphPadding = nodePadding * 2

    xMax = roundUp(xMax + graphPadding, roundTo)
    yMax = roundUp(yMax + graphPadding, roundTo)
    xMin = roundDown(xMin - graphPadding, roundTo)
    yMin = roundDown(yMin - graphPadding, roundTo)

    const topLeft: XYPosition = {
        x: xMin,
        y: yMin,
    }

    const bottomLeft: XYPosition = {
        x: xMin,
        y: yMax,
    }

    const topRight: XYPosition = {
        x: xMax,
        y: yMin,
    }

    const bottomRight: XYPosition = {
        x: xMax,
        y: yMax,
    }

    const width = Math.abs(topLeft.x - topRight.x)
    const height = Math.abs(topLeft.y - bottomLeft.y)

    const graph: GraphBoundingBox = {
        topLeft,
        bottomLeft,
        topRight,
        bottomRight,
        width,
        height,
        xMax,
        yMax,
        xMin,
        yMin,
    }

    return { nodes, graph }
}

const guaranteeWalkablePath = (grid: Grid, point: XYPosition, position: Position) => {
    let node = grid.getNodeAt(point.x, point.y)

    while (!node.walkable) {
        grid.setWalkableAt(node.x, node.y, true)
        const next = getNextPointFromPosition(node, position)
        node = grid.getNodeAt(next.x, next.y)
    }
}

const graphToGridPoint = (
    graphPoint: XYPosition,
    smallestX: number,
    smallestY: number,
    gridRatio: number
): XYPosition => {
    let x = graphPoint.x / gridRatio
    let y = graphPoint.y / gridRatio

    let referenceX = smallestX / gridRatio
    let referenceY = smallestY / gridRatio

    if (referenceX < 1) {
        while (referenceX !== 1) {
            referenceX++
            x++
        }
    } else if (referenceX > 1) {
        while (referenceX !== 1) {
            referenceX--
            x--
        }
    }

    if (referenceY < 1) {
        while (referenceY !== 1) {
            referenceY++
            y++
        }
    } else if (referenceY > 1) {
        while (referenceY !== 1) {
            referenceY--
            y--
        }
    }

    return { x, y }
}

const gridToGraphPoint = (
    gridPoint: XYPosition,
    smallestX: number,
    smallestY: number,
    gridRatio: number
): XYPosition => {
    let x = gridPoint.x * gridRatio
    let y = gridPoint.y * gridRatio

    let referenceX = smallestX
    let referenceY = smallestY

    if (referenceX < gridRatio) {
        while (referenceX !== gridRatio) {
            referenceX = referenceX + gridRatio
            x = x - gridRatio
        }
    } else if (referenceX > gridRatio) {
        while (referenceX !== gridRatio) {
            referenceX = referenceX - gridRatio
            x = x + gridRatio
        }
    }

    if (referenceY < gridRatio) {
        while (referenceY !== gridRatio) {
            referenceY = referenceY + gridRatio
            y = y - gridRatio
        }
    } else if (referenceY > gridRatio) {
        while (referenceY !== gridRatio) {
            referenceY = referenceY - gridRatio
            y = y + gridRatio
        }
    }

    return { x, y }
}

const getNextPointFromPosition = (point: XYPosition, position: Direction): XYPosition => {
    switch (position) {
        case 'top':
            return { x: point.x, y: point.y - 1 }
        case 'bottom':
            return { x: point.x, y: point.y + 1 }
        case 'left':
            return { x: point.x - 1, y: point.y }
        case 'right':
            return { x: point.x + 1, y: point.y }
    }
}

const createGrid = (
    graph: GraphBoundingBox,
    nodes: NodeBoundingBox[],
    source: PointInfo,
    target: PointInfo,
    gridRatio = 2
) => {
    const { xMin, yMin, width, height } = graph

    const mapColumns = roundUp(width, gridRatio) / gridRatio + 1
    const mapRows = roundUp(height, gridRatio) / gridRatio + 1
    const grid = new Grid(mapColumns, mapRows)

    nodes.forEach((node) => {
        const nodeStart = graphToGridPoint(node.topLeft, xMin, yMin, gridRatio)
        const nodeEnd = graphToGridPoint(node.bottomRight, xMin, yMin, gridRatio)

        for (let { x } = nodeStart; x < nodeEnd.x; x++) {
            for (let { y } = nodeStart; y < nodeEnd.y; y++) {
                grid.setWalkableAt(x, y, false)
            }
        }
    })

    const startGrid = graphToGridPoint(
        {
            x: round(source.x, gridRatio),
            y: round(source.y, gridRatio),
        },
        xMin,
        yMin,
        gridRatio
    )

    const endGrid = graphToGridPoint(
        {
            x: round(target.x, gridRatio),
            y: round(target.y, gridRatio),
        },
        xMin,
        yMin,
        gridRatio
    )

    const startingNode = grid.getNodeAt(startGrid.x, startGrid.y)
    guaranteeWalkablePath(grid, startingNode, source.position)
    const endingNode = grid.getNodeAt(endGrid.x, endGrid.y)
    guaranteeWalkablePath(grid, endingNode, target.position)

    const start = getNextPointFromPosition(startingNode, source.position)
    const end = getNextPointFromPosition(endingNode, target.position)

    return { grid, start, end }
}

const generatePath = (grid: Grid, start: XYPosition, end: XYPosition) => {
    const finder = JumpPointFinder({
        diagonalMovement: DiagonalMovement.Never,
    })

    let fullPath: number[][] = []

    try {
        fullPath = finder.findPath(start.x, start.y, end.x, end.y, grid)
    } catch {
        console.log('No path was found')
    }

    return fullPath
}

const drawStraightLinePath = (source: XYPosition, target: XYPosition, paths: number[][]) => {
    const path = paths.map(([x, y]) => `L ${x}, ${y} `).join('')
    return `M ${source.x}, ${source.y} ${path}L ${target.x}, ${target.y} `
}

interface GetPathArguments {
    storeNodes: Node[]
    source: PointInfo
    target: PointInfo
    gridRatio: number
    nodePadding: number
}

export function getPath({ storeNodes, source, target, gridRatio, nodePadding }: GetPathArguments) {
    const { graph, nodes } = getBoundingBoxes(storeNodes, nodePadding, gridRatio)
    const { grid, start, end } = createGrid(graph, nodes, source, target, gridRatio)

    const fullPath = generatePath(grid, start, end)

    const graphPath = fullPath.map(([x, y]) => {
        const graphPoint = gridToGraphPoint({ x, y }, graph.xMin, graph.yMin, gridRatio)
        return [graphPoint.x, graphPoint.y]
    })

    return drawStraightLinePath(source, target, graphPath)
}
