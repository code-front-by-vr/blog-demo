import React, {useState, useEffect} from 'react'
import {useParams, useOutletContext} from 'react-router'
import {SelectedPost} from '../components/selected-post/SelectedPost'
import {useAppSelector} from '../redux/store'
import {locales} from '../config/locales'

import type {PostType} from '../types'
import type {LayoutContextType} from '../types'

type PostParams = {
  id: string
}

export function Post(): React.ReactElement {
  const {id} = useParams<PostParams>()
  const [data, setData] = useState<PostType | null>(null)
  const {setTitle, setBreadcrumbs} = useOutletContext<LayoutContextType>()
  const {lang} = useAppSelector(state => state.lang)

  useEffect(() => {
    if (!id) return

    fetchData(id)
  }, [id])

  useEffect(() => {
    if (data?.title) {
      setTitle(data.title)
      setBreadcrumbs([
        {label: `${locales[lang].header.main}`, to: '/'},
        {label: `${locales[lang].post.title} ${id}`, to: `/posts/${id}`},
      ])
    }
  }, [id, data, setTitle, setBreadcrumbs, lang])

  async function fetchData(id: string): Promise<void> {
    const response = await fetch(`https://studapi.teachmeskills.by/blog/posts/${id}`)
    const data: PostType = await response.json()
    setData(data)
  }

  return <SelectedPost {...data} />
}
