import React from 'react'

import DefaultLayout from './DefaultLayout'

const layouts = {
    default: DefaultLayout,
}

declare type Layouts = typeof layouts
declare type LayoutType = keyof Layouts

export default function wrapLayout(
    Component: React.FunctionComponent | React.ReactElement,
    type: LayoutType = 'default'
) {
    const Layout = layouts[type]
    return () => {
        return <Layout>{React.isValidElement(Component) ? Component : <Component />}</Layout>
    }
}
