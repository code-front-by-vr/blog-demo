import { Title } from '../src/components/title/Title'
import { render, screen } from '@testing-library/react'
import { expect, test } from '@jest/globals'

test('Test component Title', () => {

    const content = 'Test title'

    render(<Title>{content}</Title>)

    const titleElement = screen.getByText(content)

    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveTextContent(content)
    expect(titleElement).toHaveClass('fw-bold')
})