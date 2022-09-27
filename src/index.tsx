import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import { RecoilRoot } from 'recoil'

import reportWebVitals from './reportWebVitals'
import AppRouter from './Router'
import { ThemeProvider } from './theme'

ReactDOM.render(
    <RecoilRoot>
        <ThemeProvider>
            <HashRouter>
                <AppRouter />
            </HashRouter>
        </ThemeProvider>
    </RecoilRoot>,
    document.getElementById('root')
)

reportWebVitals()
