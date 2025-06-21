import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {PostPreviewStateType, PostType} from '../types'

const initialState: PostPreviewStateType = {
  data: null,
  isShownModal: false,
}

export const postPreviewSlice = createSlice({
  name: 'postPreview',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<PostType>) => {
      state.data = action.payload
    },
    clearData: state => {
      state.data = null
    },
    showModal: state => {
      state.isShownModal = true
    },
    hideModal: state => {
      state.isShownModal = false
    },
  },
})

export const {setData, clearData, showModal, hideModal} = postPreviewSlice.actions
export const postPreviewReducer = postPreviewSlice.reducer
