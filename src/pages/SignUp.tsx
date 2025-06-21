import React, {useEffect} from 'react'
import {useOutletContext} from 'react-router'
import {SignUpForm} from '../components/sign-up-form/SignUpForm'
import {useAppSelector} from '../redux/store'
import {locales} from '../config/locales'

import type {LayoutContextType} from '../types'

export function SignUp(): React.ReactElement {
  const {setTitle, setBreadcrumbs} = useOutletContext<LayoutContextType>()
  const {lang} = useAppSelector(state => state.lang)

  useEffect(() => {
    setTitle(locales[lang].signUp.signUp)
    setBreadcrumbs([
      {label: `${locales[lang].header.main}`, to: '/'},
      {label: `${locales[lang].signUp.signUp}`, to: '/sign-up'},
    ])
  }, [setTitle, lang, setBreadcrumbs])

  return <SignUpForm />
}
