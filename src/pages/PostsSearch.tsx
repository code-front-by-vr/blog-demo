import React, {useEffect} from 'react'
import {useOutletContext, useParams} from 'react-router'
import {useAppSelector} from '../redux/store'
import {locales} from '../config/locales'
import type {LayoutContextType} from '../types'
import {PostsList} from '../components/posts-lists/PostLists'
import {PostPreviewModal} from '../components/post-preview-modal/PostPreviewModal'
import {CoverPreviewModal} from '../components/cover-preview-modal/CoverPreviewModal'

export function PostsSearch(): React.ReactElement {
  const {query} = useParams<{query: string}>()
  const {lang} = useAppSelector(state => state.lang)
  const {setTitle} = useOutletContext<LayoutContextType>()

  useEffect(() => {
    setTitle(locales[lang].searchResult.title + ` "${query}"`)
  }, [setTitle, lang, query])

  return (
    <>
      <PostsList />

      {/* Modals */}
      <PostPreviewModal />
      <CoverPreviewModal />
    </>
  )
}
