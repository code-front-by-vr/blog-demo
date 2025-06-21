import React, {useEffect} from 'react'
import {PostCardMd} from '../post-card/PostCardMd'
import {useAppSelector, useAppDispatch} from '../../redux/store'
import {fetchFavorites} from '../../redux/posts-slice'

import type {PostType} from '../../types'

export function PostsFavoriteList(): React.ReactElement {
  const dispatch = useAppDispatch()
  const {favorites, error, isLoading} = useAppSelector(state => state.posts)

  useEffect(() => {
    dispatch(fetchFavorites())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="alert alert-danger"> Error: {error}</div>
  }

  if (!favorites || favorites.length == 0) {
    return <div>List is empty</div>
  }

  return (
    <div className="row mt-5">
      {favorites.map((post: PostType) => (
        <PostCardMd key={post.id} {...post} />
      ))}
    </div>
  )
}
