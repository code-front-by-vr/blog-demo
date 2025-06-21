import React, {useEffect} from 'react'
import {useOutletContext} from 'react-router'
import {useAppSelector} from '../redux/store'
import {locales} from '../config/locales'

import {NewPostForm} from '../components/new-post-form/NewPostForm'

export function NewPost(): React.ReactElement {
  const {setTitle} = useOutletContext<{title: string; setTitle: (title: string) => void}>()
  const {lang} = useAppSelector(state => state.lang)

  useEffect(() => {
    setTitle(locales[lang].header.newPost)
  }, [setTitle, lang])

  return <NewPostForm />
}
