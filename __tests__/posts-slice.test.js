import { expect, describe, beforeEach, test } from '@jest/globals'
import { POSTS_LIMIT } from '../src/config/constants'
import { postsReducer, addFavorite, removeFavorite, setOrdering } from '../src/redux/posts-slice'


describe('Test posts slice reducers', () => {
    const examplePost = { id: 1, title: 'Test post', content: 'Test content' }

    let initialState

    beforeEach(() => {
        initialState = {
            list: null,
            favorites: [],
            myPosts: [],
            error: null,
            isLoading: false,
            limit: POSTS_LIMIT,
            total: 0,
            ordering: '',
        }
    })

    test('test add to favorites', () => {
        const newState = postsReducer(initialState, addFavorite(examplePost))
        expect(newState.favorites.length).toBe(1)
        expect(newState.favorites).toEqual([examplePost])
    })

    test('test remove from favorites', () => {
        const stateWithFavorite = {
            ...initialState,
            favorites: [examplePost],
        }
        const newState = postsReducer(stateWithFavorite, removeFavorite(examplePost.id))
        expect(newState.favorites.length).toBe(0)
        expect(newState.favorites).toEqual([])
    })

    test('test set ordering', () => {
        const newState = postsReducer(initialState, setOrdering('newest'))
        expect(newState.ordering).toBe('newest')
    })
})