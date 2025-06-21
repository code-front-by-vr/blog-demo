import { render, screen } from '@testing-library/react'
import { expect, test } from '@jest/globals'
import { MemoryRouter } from 'react-router'

import { BreadCrumb } from '../src/components/bread-crumb/BreadCrumb'

test('Test component BreadCrumb', () => {
    const items = [
        {
            label: 'Main',
            to: '/'
        },
        {
            label: 'Posts',
            to: '/posts'
        },
        {
            label: 'Post 1',
            to: '/posts/1'
        }
    ]

    render(
        <MemoryRouter>
            <BreadCrumb items={items} />
        </MemoryRouter>
    )

    const homeLink = screen.getByText('Main')
    const postsLink = screen.getByText('Posts')
    const postLink = screen.getByText('Post 1')

    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveTextContent('Main')
    expect(postsLink).toBeInTheDocument()
    expect(postsLink).toHaveTextContent('Posts')
    expect(postLink).toBeInTheDocument()
    expect(postLink).toHaveTextContent('Post 1')
})