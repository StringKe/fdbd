import { Box, Button, Link } from '@chakra-ui/react'
import React from 'react'
import { FiGithub } from 'react-icons/fi'

export default function GithubSourceButton() {
    return (
        <Box borderLeftWidth={2} pl={4}>
            <Button as={Link} href={'https://github.com/StringKe/fdbd'}>
                <FiGithub style={{ marginRight: '4px' }} />
                源码
            </Button>
        </Box>
    )
}
