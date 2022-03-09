import { render, screen } from '@testing-library/react'
import React from 'react'

import DefaultLayout from './DefaultLayout'

describe('Default Header Layout', () => {
    test('Header Component', () => {
        render(<DefaultLayout>TestContentHeader</DefaultLayout>)
        const element = screen.getByTestId('default-layout-header')
        expect(element).toBeInTheDocument()

        const content = screen.getByText(/TestContentHeader/i)
        expect(content).toBeInTheDocument()
    })

    test('Footer Component', () => {
        render(<DefaultLayout>TestContentFooter</DefaultLayout>)
        const element = screen.getByTestId('default-layout-footer')
        expect(element).toBeInTheDocument()

        const content = screen.getByText(/TestContentFooter/i)
        expect(content).toBeInTheDocument()
    })
})
