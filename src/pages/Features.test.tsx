import { render, screen } from '@testing-library/react'
import React from 'react'

import Features from './Features'

describe('Features Page', () => {
    test('Check if it can be mounted normally', () => {
        render(<Features />)
        const linkElement = screen.getByText(/Features/i)
        expect(linkElement).toBeInTheDocument()
    })
})
