import { Box } from '@chakra-ui/react'

import { BlitzPage } from 'blitz'

import Layout from 'app/core/layouts/Layout'

const HomePage: BlitzPage = () => {
    return <Box>HomePage</Box>
}

HomePage.suppressFirstRenderFlicker = true
HomePage.getLayout = (page) => <Layout title='Home'>{page}</Layout>

export default HomePage
