import React from 'react'
import { Route, Routes } from 'react-router-dom'

import App from './pages/App'
import Features from './pages/Features'
import NotFound from './pages/NotFound'
import Welcome from './pages/Welcome'

function AppRouter() {
    return (
        <Routes>
            {/* 404 Page */}
            <Route path='*' element={<NotFound />} />
            {/* Other Pages */}
            <Route path={'/'} element={<Welcome />} />
            <Route path={'/features'} element={<Features />} />

            {/*  DBML APP  */}
            <Route path={'/app'} element={<App />} />
        </Routes>
    )
}

export default AppRouter
