import React, {useEffect} from 'react'
import {useOutletContext} from 'react-router'
import {PostsList} from '../components/posts-lists/PostLists'
import {useAppSelector} from '../redux/store'
import {locales} from '../config/locales'

import type {LayoutContextType} from '../types'
import {PostPreviewModal} from '../components/post-preview-modal/PostPreviewModal'
import {CoverPreviewModal} from '../components/cover-preview-modal/CoverPreviewModal'

export function Main(): React.ReactElement {
  const {setTitle, setBreadcrumbs} = useOutletContext<LayoutContextType>()
  const {lang} = useAppSelector(state => state.lang)

  useEffect(() => {
    setTitle(locales[lang].header.posts)
    setBreadcrumbs([])
  }, [setTitle, lang, setBreadcrumbs])

  return (
    <>
      <PostsList />

      {/* Modals */}
      <PostPreviewModal />
      <CoverPreviewModal />
    </>
  )
}
