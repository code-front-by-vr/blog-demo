import type {PostsParamsType, PostsResponseType, PostType} from '../types'
import {get, post} from '../config/client'
import {baseUrl, postsEndpoint, myPostsEndpoint} from '../config/api'

export async function requestPosts(params?: PostsParamsType): Promise<PostsResponseType> {
  const response = await get(baseUrl + postsEndpoint, {params})
  return response.data
}

export async function requestPost(id: number | string): Promise<PostType | void> {
  try {
    const response = await get(baseUrl + postsEndpoint + '/' + id)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

export async function requestNewPost(formData: FormData) {
  try {
    const response = await post(baseUrl + postsEndpoint, formData)

    return response.data
  } catch (error) {
    console.log('Error', error.message)
  }
}

export async function requestMyPosts(params?: PostsParamsType): Promise<PostsResponseType> {
  try {
    const response = await get(baseUrl + myPostsEndpoint, {params})
    return response.data
  } catch (error) {
    console.log(error.message)
    return {count: 0, results: []}
  }
}
