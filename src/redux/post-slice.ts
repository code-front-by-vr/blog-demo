import {createSlice, type PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import type {PostStateType, PostType} from '../types'
import {requestPost, requestNewPost} from '../services/posts'

export const fetchPost = createAsyncThunk('post/fetchPost', async (id: string) => {
  const data = await requestPost(id)

  return data
})

export const fetchNewPost = createAsyncThunk('post/fetchNewPost', async (formData: FormData) => {
  const data = await requestNewPost(formData)

  return data
})

const initialState: PostStateType = {
  data: null,
  isLoading: false,
  error: null,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPost.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.error = action.error.message || null
        state.isLoading = false
      })
      .addCase(fetchPost.fulfilled, (state, action: PayloadAction<PostType>) => {
        state.data = action.payload
        state.isLoading = false
      })
      .addCase(fetchNewPost.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchNewPost.rejected, (state, action) => {
        state.error = action.error.message || null
        state.isLoading = false
      })
      .addCase(fetchNewPost.fulfilled, (state, action: PayloadAction<PostType>) => {
        state.data = action.payload
        state.isLoading = false
      })
  },
})

export const postReducer = postSlice.reducer
