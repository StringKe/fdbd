import React from 'react'
import { Route, Routes } from 'react-router-dom'

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
        </Routes>
    )
}

export default AppRouter
