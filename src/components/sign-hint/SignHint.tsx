import React from 'react'
import {locales} from '../../config/locales'
import {useAppSelector} from '../../redux/store'

type HintType = 'sign-in' | 'sign-up'

export function SignHint({hint}: {hint: HintType}): React.ReactElement | null {
  const {lang} = useAppSelector(state => state.lang)

  const renderHint = (hint: HintType): React.ReactElement | null => {
    if (!hint) return null

    if (hint === 'sign-in') {
      return (
        <p className="text-center text-light-emphasis mb-0">
          {locales[lang].signHint.noAccount} <a href="#">{locales[lang].signUp.signUp}</a>
        </p>
      )
    } else {
      return (
        <p className="text-center text-light-emphasis mb-0">
          {locales[lang].signHint.haveAccount} <a href="#">{locales[lang].signIn.signIn}</a>
        </p>
      )
    }
  }

  return renderHint(hint)
}
