import React, {useEffect} from 'react'
import {useOutletContext} from 'react-router'
import {useAppSelector} from '../redux/store'
import {locales} from '../config/locales'

import {SignInForm} from '../components/sign-in-form/SignInForm'
import type {LayoutContextType} from '../types'

export function SignIn(): React.ReactElement {
  const {setTitle, setBreadcrumbs} = useOutletContext<LayoutContextType>()
  const {lang} = useAppSelector(state => state.lang)

  useEffect(() => {
    setTitle(locales[lang].signIn.signIn)
    setBreadcrumbs([
      {label: `${locales[lang].header.main}`, to: '/'},
      {label: `${locales[lang].signIn.signIn}`, to: '/sign-in'},
    ])
  }, [setTitle, lang, setBreadcrumbs])

  return <SignInForm />
}
