import { Box } from '@chakra-ui/react'
import React from 'react'

import wrapLayout from '../layout'

const Welcome = wrapLayout(() => {
    return <Box>Welcome</Box>
}, 'default')

export default Welcome
