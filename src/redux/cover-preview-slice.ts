import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {PostPreviewStateType, PostType} from '../types'

const initialState: PostPreviewStateType = {
  data: null,
  isShownModal: false,
}

export const coverPreviewSlice = createSlice({
  name: 'coverPreview',
  initialState,
  reducers: {
    setCoverPreview: (state, action: PayloadAction<PostType>) => {
      state.data = action.payload
    },
    showCoverPreview: state => {
      state.isShownModal = true
    },
    hideCoverPreview: state => {
      state.isShownModal = false
    },
    clearCoverPreview: state => {
      state.data = null
    },
  },
})

export const {setCoverPreview, showCoverPreview, hideCoverPreview, clearCoverPreview} =
  coverPreviewSlice.actions
export const coverPreviewReducer = coverPreviewSlice.reducer
