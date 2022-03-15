const randomInt = (min: number, max: number) => ~~(Math.random() * (max - min + 1)) + min

export class Spot {
    x: number = 0
    y: number = 0
    g: number = 0
    h: number = 0
    f: number = 0
    value: number = 0
    key: GridPos = [0, 0]
    render?: RenderFn = undefined
    parent?: any

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.g = 0
        this.h = 0
        this.f = 0
        this.value = 0
        this.key = [x, y]
    }
}

export declare type RenderFn = (args: { key: string; val: any }) => void

export declare type GridPos = [number, number]

export interface GridOptions {
    col: number
    row: number
    render?: RenderFn
}

export class Grid {
    col: number = 0
    row: number = 0
    grid: Spot[][]

    constructor(options: GridOptions) {
        this.col = options.col
        this.row = options.row
        this.grid = this.createGrid(this.col, this.row, options.render)
    }

    /**
     * 为地图对象生成指定比例的障碍物
     * @param {number} scale <必选> 障碍物比例0-100
     * @param {number} type <必选> 障碍物类型，任意数字
     */
    obstacle(scale: number, type: number) {
        let amount = ~~((this.col * this.row * scale) / 100),
            xy: [number, number] = [0, 0],
            result: Record<any, any> = {}

        const maskMap = () => {
            xy[0] = randomInt(0, this.col - 1)
            xy[1] = randomInt(0, this.row - 1)

            let item = this.get(xy)
            if (item && item.value === 0) {
                item.value = type
                // @ts-ignore
                result[[xy[0], xy[1]]] = null
            } else {
                maskMap()
            }
        }

        for (let i = 0; i < amount; i++) {
            maskMap()
        }

        return result
    }

    /**
     * 获取地图指定位置的方法
     * @param {array} xy <必填> 任意节点坐标
     * @return {Spot} 当前位置的网格点
     */
    get(xy: GridPos) {
        let row = this.grid[xy[1]]
        return row ? row[xy[0]] : undefined
    }

    /**
     * 地图设置方法
     * @param {array} xy <必填> 任意节点坐标
     * @param {string} key <必填> 需要设置的键
     * @param {number} val <必选> 设置项目的值
     */
    set(xy: GridPos, key: string, val: any) {
        let spot = this.get(xy)
        if (spot) {
            // @ts-ignore
            spot[key] = val
            typeof spot.render === 'function' &&
                spot.render({
                    key: key,
                    val: val,
                })
        }
    }

    /**
     * 生成一个空的网格对象
     * @param {number} col 列，即宽
     * @param {number} row 行，即高
     * @param render
     * @return {object} 网格地图对象
     */
    createGrid(col: number, row: number, render: RenderFn = () => undefined) {
        let result = []
        for (let i = 0; i < row; i++) {
            let wArr = (() => {
                let wResult = []
                for (let j = 0; j < col; j++) {
                    let spot = new Spot(j, i)
                    if (typeof render === 'function') {
                        spot.render = render
                    }
                    wResult[j] = spot
                }

                return wResult
            })()
            result.push(wArr)
        }

        return result
    }

    getData() {
        const grid = this.grid
        let result = []
        for (let i = 0, iLen = grid.length; i < iLen; i++) {
            let item = grid[i]
            result.push(
                (() => {
                    let row = []
                    for (let j = 0, jLen = item.length; j < jLen; j++) {
                        row.push(item[j].value)
                    }

                    return row
                })()
            )
        }

        return result
    }
}

export default Grid
