import React, {useEffect} from 'react'
import {RouterProvider} from 'react-router'
import {router} from './router'
import {store, useAppDispatch, useAppSelector} from './redux/store'
import {Provider} from 'react-redux'
import {fetchFavorites, fetchPosts} from './redux/posts-slice'

function AppContent() {
  const dispatch = useAppDispatch()
  const postsList = useAppSelector(state => state.posts.list)

  useEffect(() => {
    dispatch(fetchPosts({}))
  }, [dispatch])

  useEffect(() => {
    if (postsList && postsList.length > 0) {
      dispatch(fetchFavorites())
    }
  }, [dispatch, postsList])

  return <RouterProvider router={router} />
}

export function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}
