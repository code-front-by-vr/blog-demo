import React from 'react'
import {Link} from 'react-router'
import {PostType} from '../../types'
import {locales} from '../../config/locales'

import {setCoverPreview, showCoverPreview} from '../../redux/cover-preview-slice'
import {setData, showModal} from '../../redux/post-preview-slice'
import {addFavorite, removeFavorite} from '../../redux/posts-slice'
import {useAppDispatch, useAppSelector} from '../../redux/store'

import {CiBookmark} from 'react-icons/ci'
import {BsBookmarkFill} from 'react-icons/bs'

export function PostCardMd(props: PostType): React.ReactElement {
  const {title, image, date, id} = props
  const dispatch = useAppDispatch()
  const {lang} = useAppSelector(state => state.lang)
  const {favorites} = useAppSelector(state => state.posts)

  function getBookmarkIcon() {
    return favorites.some(post => post.id === id) ? (
      <BsBookmarkFill size="1.5em" className="text-secondary" />
    ) : (
      <CiBookmark size="1.5em" className="text-secondary" />
    )
  }

  function handleClickCoverPreview() {
    dispatch(setCoverPreview(props))
    dispatch(showCoverPreview())
  }

  function handleClickPostPreview() {
    dispatch(setData(props))
    dispatch(showModal())
  }

  function handleClickBookmark() {
    if (favorites.some(post => post.id === id)) {
      dispatch(removeFavorite(id))
    } else {
      dispatch(addFavorite(props))
    }
  }

  return (
    <article className="card border-0 border-bottom rounded-0 d-flex flex-row mb-3">
      <div className="col-3" onClick={handleClickCoverPreview}>
        <img
          src={image}
          className="w-100 ratio ratio-1x1 object-fit-cover"
          style={{height: '200px'}}
          alt={title}
        />
      </div>
      <div className="card-body col-9">
        <p className="card-text">
          <small className="text-body-secondary">{date}</small>
        </p>
        <h5 className="card-title fw-semibold">{title}</h5>
        <div className="d-flex gap-2 align-items-center">
          <Link to={`/posts/${id}`} className="btn btn-primary">
            {locales[lang].post.readMore}
          </Link>
          <button type="button" className="btn btn-warning" onClick={handleClickPostPreview}>
            {locales[lang].post.quickView}
          </button>
          <div style={{cursor: 'pointer'}} onClick={handleClickBookmark}>
            {getBookmarkIcon()}
          </div>
        </div>
      </div>
    </article>
  )
}
