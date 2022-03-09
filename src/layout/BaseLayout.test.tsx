import { render, screen } from '@testing-library/react'
import React from 'react'

import BaseLayout from './BaseLayout'

describe('Base Header Layout', () => {
    test('Check if it can be mounted normally', () => {
        render(<BaseLayout />)
        const baseElement = screen.getByTestId('base-layout')
        expect(baseElement).toBeInTheDocument()
    })
})
