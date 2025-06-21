import React, {useEffect} from 'react'
import {locales} from '../config/locales'
import {useAppSelector} from '../redux/store'
import {Tabs} from '../components/tabs/Tabs'
import {PostsFavoriteList} from '../components/posts-favorite-list/PostsFavoriteList'
import {useOutletContext} from 'react-router'

import type {LayoutContextType} from '../types'
import {PostPreviewModal} from '../components/post-preview-modal/PostPreviewModal'
import {CoverPreviewModal} from '../components/cover-preview-modal/CoverPreviewModal'

export function FavoritePosts(): React.ReactElement {
  const {setTitle, setBreadcrumbs} = useOutletContext<LayoutContextType>()
  const {lang} = useAppSelector(state => state.lang)

  useEffect(() => {
    setTitle(locales[lang].header.posts)
    setBreadcrumbs([])
  }, [setTitle, lang, setBreadcrumbs])

  return (
    <>
      <Tabs tabs={locales[lang].tabs} />
      <PostsFavoriteList />

      {/* Modals */}
      <PostPreviewModal />
      <CoverPreviewModal />
    </>
  )
}
