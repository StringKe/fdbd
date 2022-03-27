import { BlitzLayout, Head } from 'blitz'

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>{title || 'fdbd'}</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            {children}
        </>
    )
}

export default Layout
