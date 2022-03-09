import { render, screen } from '@testing-library/react'
import React from 'react'

import NotFound from './NotFound'

describe('NotFound Page', () => {
    test('Check if it can be mounted normally', () => {
        render(<NotFound />)
        const linkElement = screen.getByText(/NotFound/i)
        expect(linkElement).toBeInTheDocument()
    })
})
