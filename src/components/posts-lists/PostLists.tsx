import React, {useEffect} from 'react'
import {PostCardMd} from '../post-card/PostCardMd'
import {useAppDispatch, useAppSelector} from '../../redux/store.ts'

import {fetchPosts, setOrdering} from '../../redux/posts-slice.ts'
import {NavLink, useParams} from 'react-router'
import {POSTS_LIMIT} from '../../config/constants.ts'
import {buildSchemePagination} from '../../utils/buildPagination.tsx'

export function PostsList() {
  const {currentPage = 1, query} = useParams()
  const dispatch = useAppDispatch()
  const {list, error, isLoading, total, ordering} = useAppSelector(state => state.posts)

  useEffect(() => {
    const offset = (Number(currentPage) - 1) * POSTS_LIMIT
    dispatch(fetchPosts({offset, search: query ?? '', ordering}))
  }, [dispatch, currentPage, query, ordering])

  function renderPagination() {
    const pageCount = Math.ceil(total / POSTS_LIMIT)
    const pagination = buildSchemePagination(+currentPage, pageCount)

    if (pageCount == 1) return null

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
                <NavLink className="page-link" to={`/posts/all/${item}`}>
                  {item}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }

  function handleChangeSorting(event: React.ChangeEvent<HTMLSelectElement>): void {
    if (event.target.value == '') {
      dispatch(setOrdering('-date'))
    }
    dispatch(setOrdering(event.target.value))
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  if (!list || list.length == 0) {
    return <div>List is empty</div>
  }

  return (
    <div className="row mt-5">
      {renderPagination()}
      <select
        className="form-select form-select-sm w-25 mb-4"
        onChange={handleChangeSorting}
        value={ordering}
      >
        <option value="">Сортировать по:</option>
        <option value="-date">Дата добавления</option>
        <option value="title">Заголовок</option>
        <option value="id">Номер статьи</option>
      </select>
      {list.map(post => (
        <PostCardMd key={post.id} {...post} />
      ))}
    </div>
  )
}
