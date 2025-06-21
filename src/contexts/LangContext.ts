import {createContext} from 'react'
import type {LangContextType} from '../types'

export const initialState: LangContextType = {
  lang: 'en',
  setLang: () => {},
}

export const LangContext = createContext<LangContextType>(initialState)
