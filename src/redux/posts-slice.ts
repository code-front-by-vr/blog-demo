import {createSlice, createAsyncThunk, type PayloadAction} from '@reduxjs/toolkit'
import type {PostsStateType, PostsParamsType, PostsResponseType, PostType} from '../types'
import {requestPosts, requestMyPosts} from '../services/posts'
import type {RootState} from './store'

import {POSTS_LIMIT} from '../config/constants'

const FAVORITES_KEY = 'favorites'

export const fetchPosts = createAsyncThunk<PostsResponseType, PostsParamsType, {state: RootState}>(
  'posts/fetchPosts',
  async (params: PostsParamsType = {}, {getState}) => {
    const ordering = (getState() as RootState).posts.ordering

    const {limit = POSTS_LIMIT, offset = 0, author__course_group = 17} = params

    const data = await requestPosts({
      ...params,
      limit,
      offset,
      author__course_group,
      ordering,
    })

    return data
  }
)

export const fetchFavorites = createAsyncThunk<PostType[], void, {state: RootState}>(
  'posts/fetchFavorites',
  async (__, {getState}) => {
    const favoritesId: number[] = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
    const posts = getState().posts.list ?? []
    return posts.filter(post => favoritesId.includes(post.id))
  }
)

export const fetchMyPosts = createAsyncThunk<PostsResponseType, PostsParamsType>(
  'posts/fetchMyPosts',
  async (params: PostsParamsType = {}) => {
    const {limit = POSTS_LIMIT, offset = 0} = params

    const data = await requestMyPosts({
      ...params,
      limit,
      offset,
    })

    return data
  }
)

const initialState: PostsStateType = {
  list: null,
  favorites: [],
  myPosts: [],
  error: null,
  isLoading: false,
  limit: POSTS_LIMIT,
  total: 0,
  ordering: '',
}

export const favoritesLocalStorageMiddleware = store => next => action => {
  const result = next(action)
  if (action.type === 'posts/addFavorite' || action.type === 'posts/removeFavorite') {
    const state = store.getState()
    const favoritesId = state.posts.favorites.map((post: PostType) => post.id)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesId))
  }
  return result
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<PostType>) => {
      state.favorites.push(action.payload)
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(post => post.id !== action.payload)
    },
    setOrdering: (state, action: PayloadAction<string>) => {
      state.ordering = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message || null
        state.isLoading = false
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostsResponseType>) => {
        state.list = action.payload.results
        state.total = action.payload.count
        state.isLoading = false
      })
      .addCase(fetchFavorites.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.error = action.error.message || null
        state.isLoading = false
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<PostType[]>) => {
        state.favorites = action.payload
        state.isLoading = false
      })
      .addCase(fetchMyPosts.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.error = action.error.message || null
        state.isLoading = false
      })
      .addCase(fetchMyPosts.fulfilled, (state, action: PayloadAction<PostsResponseType>) => {
        state.myPosts = action.payload.results
        state.total = action.payload.count
        state.isLoading = false
      })
  },
})

export const postsReducer = postsSlice.reducer
export const {addFavorite, removeFavorite, setOrdering} = postsSlice.actions
