import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { RecoilRoot } from 'recoil'

import reportWebVitals from './reportWebVitals'
import AppRouter from './Router'
import { ThemeProvider } from './theme'

// ReactDOM.render(
//     <React.StrictMode>
//         <RecoilRoot>
//             <ThemeProvider>
//                 <BrowserRouter>
//                     <AppRouter />
//                 </BrowserRouter>
//             </ThemeProvider>
//         </RecoilRoot>
//     </React.StrictMode>,
//     document.getElementById('root')
// )
ReactDOM.render(
    <RecoilRoot>
        <ThemeProvider>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </ThemeProvider>
    </RecoilRoot>,
    document.getElementById('root')
)

reportWebVitals()
