import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter } from 'react-router-dom'

import { RecoilRoot } from 'recoil'

import reportWebVitals from './reportWebVitals'
import AppRouter from './Router'
import { ThemeProvider } from './theme'

const RouterDispatch = window.location.host.includes('bhi.cc') ? HashRouter : BrowserRouter

ReactDOM.render(
    <RecoilRoot>
        <ThemeProvider>
            <RouterDispatch>
                <AppRouter />
            </RouterDispatch>
        </ThemeProvider>
    </RecoilRoot>,
    document.getElementById('root')
)

reportWebVitals()
