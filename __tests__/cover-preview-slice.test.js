import { expect, describe, beforeEach, test } from '@jest/globals'
import { coverPreviewReducer, setCoverPreview, showCoverPreview, hideCoverPreview, clearCoverPreview } from '../src/redux/cover-preview-slice'

describe('Test cover preview slice reducers', () => {
    const examplePost = { id: 1, title: 'Test post', image: 'Test image' }
    let initialState

    beforeEach(() => {
        initialState = {
            data: null,
            isShownModal: false,
        }
    })

    test('test set cover preview', () => {
        const newState = coverPreviewReducer(initialState, setCoverPreview(examplePost))
        expect(newState.data).toEqual(examplePost)
    })

    test('test show cover preview', () => {
        const newState = coverPreviewReducer(initialState, showCoverPreview())
        expect(newState.isShownModal).toBe(true)
    })

    test('test hide cover preview', () => {
        const newState = coverPreviewReducer(initialState, hideCoverPreview())
        expect(newState.isShownModal).toBe(false)
    })

    test('test clear cover preview', () => {
        const newState = coverPreviewReducer(initialState, clearCoverPreview())
        expect(newState.data).toBeNull()
    })
})