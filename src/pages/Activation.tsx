import React, {useEffect} from 'react'
import {useParams, useNavigate} from 'react-router'
import {fetchActivation} from '../redux/auth-slice'
import {useAppDispatch, useAppSelector} from '../redux/store.ts'

export function Activation() {
  const {uid, token} = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {isActivated} = useAppSelector(state => state.auth)

  useEffect(() => {
    console.log(uid, token)

    dispatch(fetchActivation({uid, token}))
  }, [uid, token, dispatch])

  if (isActivated) {
    navigate('/auth/activation/success')
  }

  return <p>Process activation...</p>
}
