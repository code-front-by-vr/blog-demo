export type LangType = 'en' | 'ru'

export interface LangContextType {
  lang: LangType
  setLang: (lang: LangType) => void
}

// Auth
export type SignUpBodyType = {
  username: string
  email: string
  password: string
  passwordConfirm: string
  course_group?: number
}

export type SignInBodyType = {
  email: string
  password: string
}

export type JwtType = {
  access: string
  refresh: string
}

export type UserType = {
  id: number
  username: string
  email: string
  course_group: number
}

export type AuthStateType = {
  email: string | null
  isLoading: boolean
  error: string | null
  isSignedUp: boolean
  isActivated: boolean
  jwt: JwtType | null
}

// Activation
export type ActivationBodyType = {
  uid?: string
  token?: string
}

export interface PostType {
  id: number
  image: string
  text: string
  date: string
  lesson_num: number
  title: string
  description: string
  author: number
}

export interface SelectedPostProps {
  image?: string
  title?: string
  text?: string
  date?: string
}

export interface LayoutContextType {
  title: string
  setTitle: (title: string) => void
  breadcrumbs: BreadcrumbItem[]
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void
}

export interface BreadcrumbItem {
  label: string
  to: string
}

export interface ApiResponse {
  results: PostType[]
  count: number
  next: string | null
  previous: string | null
}

// Post preview
export interface PostPreviewStateType {
  data: PostType | null
  isShownModal: boolean
}

// Posts
export type PostsStateType = {
  list: PostType[] | null
  favorites: PostType[]
  myPosts: PostType[]
  error: string | null
  isLoading: boolean
  limit: number
  total: number
  ordering: string
}

export type PostsParamsType = {
  author__course_group?: number
  limit?: number
  offset?: number
  ordering?: string
  search?: string
}

export type PostsResponseType = {
  count: number
  results: PostType[]
}

// Lang
export interface LangStateType {
  lang: LangType
}

// Tabs
export interface TabsProps {
  tabs: {label: string; path: string}[]
}

export interface TabsState {
  activeIndex: number | null
}

// Post
export type PostStateType = {
  data: PostType | null
  isLoading: boolean
  error: string | null
}
