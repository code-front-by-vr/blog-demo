import axios from 'axios'
import {baseUrl} from './api'
import {store} from '../redux/store'
import {authRefreshEndpoint} from '../config/api'
import {jwt} from '../utils/jwt'
import {fetchRefresh} from '../redux/auth-slice'
import type {JwtType} from '../types'

const client = axios.create({
  baseURL: baseUrl,
})

client.interceptors.request.use(async function (config) {
  if (config.url?.includes(authRefreshEndpoint)) {
    return config
  }

  let token = store.getState().auth.jwt

  if (token) {
    if (jwt.isTokenExpired(token.access)) {
      await store.dispatch(fetchRefresh({refresh: token.refresh}))
      token = store.getState().auth.jwt as JwtType
    }

    config.headers.Authorization = `Bearer ${token.access}`
  }

  return config
})

export const get = client.get
export const post = client.post
export const put = client.put
export const del = client.delete
