import { render, screen } from '@testing-library/react'
import React from 'react'

import Welcome from './Welcome'

describe('Welcome Page', () => {
    test('Check if it can be mounted normally', () => {
        render(<Welcome />)
        const linkElement = screen.getByText(/Welcome/i)
        expect(linkElement).toBeInTheDocument()
    })
})
