import React, {useEffect} from 'react'
import {PostCardMd} from '../post-card/PostCardMd'
import {useAppSelector, useAppDispatch} from '../../redux/store'
import {fetchMyPosts} from '../../redux/posts-slice'

import type {PostType} from '../../types'
import {NavLink, useParams} from 'react-router'
import {buildSchemePagination} from '../../utils/buildPagination'
import {POSTS_LIMIT} from '../../config/constants'

export function MyPostsList(): React.ReactElement {
  const {currentPage = 1} = useParams()
  const dispatch = useAppDispatch()
  const {myPosts, error, isLoading, total} = useAppSelector(state => state.posts)

  useEffect(() => {
    const offset = (Number(currentPage) - 1) * POSTS_LIMIT
    dispatch(fetchMyPosts({offset}))
  }, [dispatch, currentPage])

  function renderPagination() {
    const pageCount = Math.ceil(total / POSTS_LIMIT)
    const pagination = buildSchemePagination(+currentPage, pageCount)

    if (pageCount == 1) return

    return (
      <nav className="my-2">
        <ul className="pagination">
          {pagination.map((item, index) => {
            if (typeof item === 'string') {
              return (
                <li className="page-item disabled" key={index}>
                  <span className="page-link">{item}</span>
                </li>
              )
            }

            return (
              <li className="page-item" key={index}>
                <NavLink className="page-link" to={`/posts/my-posts/${item}`}>
                  {item}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="alert alert-danger"> Error: {error}</div>
  }

  if (!myPosts || myPosts.length == 0) {
    return <div>List is empty</div>
  }

  return (
    <div className="row mt-5">
      {renderPagination()}
      {myPosts.map((post: PostType) => (
        <PostCardMd key={post.id} {...post} />
      ))}
    </div>
  )
}
