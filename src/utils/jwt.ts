import {jwtDecode} from 'jwt-decode'
import type {JwtType} from '../types'

const JWT_KEY = 'jwt'

export const jwt = {
  getFromLocalStorage(): JwtType | null {
    const jwt = localStorage.getItem(JWT_KEY)

    if (jwt) {
      return JSON.parse(jwt) as JwtType
    }

    return null
  },

  setToLocalStorage(jwt: JwtType) {
    localStorage.setItem(JWT_KEY, JSON.stringify(jwt))
  },

  clearJwt() {
    localStorage.removeItem(JWT_KEY)
  },

  isTokenExpired(access: string): boolean {
    const {exp} = jwtDecode(access)

    return Date.now() >= exp * 1000
  },
}
