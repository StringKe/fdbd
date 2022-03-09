import { render, screen } from '@testing-library/react'
import React from 'react'

import CleanLayout from './CleanLayout'

describe('Default Header Layout', () => {
    test('check wrap element', () => {
        render(<CleanLayout>TestContent</CleanLayout>)
        const element = screen.getByTestId('clean-layout')
        expect(element).toBeInTheDocument()

        const content = screen.getByText(/TestContent/i)
        expect(content).toBeInTheDocument()
    })
})
