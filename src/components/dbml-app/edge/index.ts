import { BezierEdge, SmoothStepEdge, StepEdge, StraightEdge } from 'react-flow-renderer'

import { SmartEdge } from './SmartEdge'

export const edgeTypes = {
    smart: SmartEdge,
    bezier: BezierEdge,
    smoothstep: SmoothStepEdge,
    step: StepEdge,
    straight: StraightEdge,
}
