import { render, screen } from '@testing-library/react'
import { expect, test } from '@jest/globals'

import { SelectedPost } from '../src/components/selected-post/SelectedPost'

test('Test component SelectedPost', () => {
    const newPost = {
        title: 'Test post',
        text: 'Test text',
        date: '2021-01-01',
        image: 'Test image',
    }

    render(<SelectedPost {...newPost} />)

    const newPostElement = screen.getByRole('article')

    expect(newPostElement).toBeInTheDocument()
    expect(newPostElement).toHaveTextContent(newPost.text)
    expect(newPostElement).toHaveTextContent(newPost.date)

    const imageElement = screen.getByRole('img')
    expect(imageElement).toBeInTheDocument()
    expect(imageElement).toHaveAttribute('src', newPost.image)
    expect(imageElement).toHaveAttribute('alt', newPost.title)
})
