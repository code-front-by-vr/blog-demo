import {configureStore} from '@reduxjs/toolkit'
import {useDispatch, useSelector} from 'react-redux'
import {postPreviewReducer} from './post-preview-slice'
import {postReducer} from './post-slice'
import {coverPreviewReducer} from './cover-preview-slice'
import {langReducer} from './lang-slice'
import {favoritesLocalStorageMiddleware, postsReducer} from './posts-slice'
import {tabsReducer} from './tabs-slice'
import {authReducer} from './auth-slice'

// const middleware = [favoritesLocalStorageMiddleware]
const middleware = process.env.NODE_ENV === 'test' ? [] : [favoritesLocalStorageMiddleware]

export const store = configureStore({
  reducer: {
    postPreview: postPreviewReducer,
    coverPreview: coverPreviewReducer,
    lang: langReducer,
    posts: postsReducer,
    post: postReducer,
    tabs: tabsReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
