import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Features from './pages/Features'
import Welcome from './pages/Welcome'

function AppRouter() {
    return (
        <Routes>
            <Route path={'/'} element={<Welcome />} />
            <Route path={'/features'} element={<Features />} />
        </Routes>
    )
}

export default AppRouter
