import { render, screen, fireEvent } from '@testing-library/react'
import { expect, test, describe, jest } from '@jest/globals'
import { Button } from '../src/components/button/Button'

describe('Test component Button', () => {
    test('Test button with text', () => {
        render(<Button>Click me</Button>)
        const buttonElement = screen.getByText('Click me')

        expect(buttonElement).toBeInTheDocument()
    })

    test('Test button with onClick', () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}>Click me</Button>)

        const buttonElement = screen.getByText('Click me')
        expect(buttonElement).toBeInTheDocument()

        fireEvent.click(buttonElement)
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})