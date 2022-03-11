import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import App from './pages/App'

// import Features from './pages/Features'
// import Welcome from './pages/Welcome'

function AppRouter() {
    return (
        <Routes>
            {/* 404 Page */}
            <Route path='*' element={<Navigate to={'/app'} />} />
            {/* Other Pages */}
            {/*<Route path={'/test'} element={<Welcome />} />*/}
            {/*<Route path={'/test/features'} element={<Features />} />*/}

            {/*  DBML APP  */}
            <Route path={'/app'} element={<App />} />
        </Routes>
    )
}

export default AppRouter
