import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import reportWebVitals from './reportWebVitals'
import AppRouter from './Router'
import { ThemeProvider } from './theme'

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
