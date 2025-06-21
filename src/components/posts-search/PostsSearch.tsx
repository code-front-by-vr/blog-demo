import React, {useEffect, useState} from 'react'
import {PostCardSm} from '../post-card/PostCardSm'
import type {ApiResponse, PostType} from '../../types'

export function PostsSearch(): React.ReactElement {
  const [searchResult, setSearchResult] = useState<PostType[]>([])

  useEffect(() => {
    const fetchSearchResult = async (): Promise<void> => {
      const response = await fetch('https://studapi.teachmeskills.by/blog/posts?limit=15&offset=0')
      const data: ApiResponse = await response.json()
      setSearchResult(data.results)
    }
    fetchSearchResult()
  }, [])

  return (
    <ul className="list-unstyled mt-5">
      {searchResult.map(item => (
        <li className="mb-3" key={item.id}>
          <PostCardSm {...item} imagePosition="left" imageSize="compact" />
        </li>
      ))}
    </ul>
  )
}
