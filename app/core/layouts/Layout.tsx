import { BlitzLayout, Head } from 'blitz'

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>
                    {title || '页面'}
                    {' | '}
                    {process.env.BLITZ_PUBLIC_SITE_TITLE}
                    {' - '}
                    {process.env.BLITZ_PUBLIC_SITE_SUB_TITLE}
                </title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            {children}
        </>
    )
}

export default Layout
