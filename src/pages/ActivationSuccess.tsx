import React, {useEffect} from 'react'
import {useOutletContext, useNavigate} from 'react-router'
import {Button} from '../components/button/Button'
import {useAppSelector} from '../redux/store'
import {LayoutContextType} from '../types'
import {locales} from '../config/locales'

export function ActivationSuccess(): React.ReactElement {
  const {lang} = useAppSelector(state => state.lang)
  const {setTitle} = useOutletContext<LayoutContextType>()
  const navigate = useNavigate()

  const title = locales[lang].registrationSuccess.title

  useEffect(() => {
    setTitle(title)
  }, [setTitle, title])

  function handleClickGoHome() {
    navigate('/')
  }

  return (
    <div className="card w-50 m-auto p-3 mt-5">
      <div className="card-body">
        <p className="card-text w-50">{locales[lang].registrationSuccess.email}</p>
        <p className="card-text w-50 mb-5">{locales[lang].registrationSuccess.description}</p>
        <Button onClick={handleClickGoHome}>{locales[lang].registrationConfirmation.goHome}</Button>
      </div>
    </div>
  )
}
