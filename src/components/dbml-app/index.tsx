import { Flex } from '@chakra-ui/react'
import { SmartEdgeProvider } from '@tisoap/react-flow-smart-edge'
import React from 'react'
import { ReactFlowProvider } from 'react-flow-renderer'

import Container from './Container'
import TipBar from './TipBar'
import Toolbar from './Toolbar'

export function DbmlApp() {
    return (
        <ReactFlowProvider>
            <SmartEdgeProvider
                options={{
                    debounceTime: 0,
                    nodePadding: 20,
                    lineType: 'curve',
                    gridRatio: 40,
                    lessCorners: true,
                }}
            >
                <Flex
                    position={'absolute'}
                    left={0}
                    top={0}
                    width={'100vw'}
                    height={'100vh'}
                    overflow={'hidden'}
                    userSelect={'none'}
                    flexDir={'column'}
                    data-tsetid={'app-page'}
                >
                    <Toolbar />
                    <Container />
                    <TipBar />
                </Flex>
            </SmartEdgeProvider>
        </ReactFlowProvider>
    )
}
