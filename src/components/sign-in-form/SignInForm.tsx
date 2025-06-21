import React from 'react'
import {useAppDispatch, useAppSelector} from '../../redux/store.ts'
import {useNavigate} from 'react-router'
import {fetchSignIn} from '../../redux/auth-slice'
import {useForm, type SubmitHandler} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'

import {Input} from '../input/Input.tsx'
import {Button} from '../button/Button'
import {SignHint} from '../sign-hint/SignHint'

import {locales} from '../../config/locales'

const SignInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

type SignInFormType = z.infer<typeof SignInSchema>

export function SignInForm(): React.ReactElement {
  const {lang} = useAppSelector(state => state.lang)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<SignInFormType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<SignInFormType> = async data => {
    await dispatch(fetchSignIn(data))
    reset()
    navigate('/')
  }

  return (
    <form
      className="py-4 px-5 mt-4 w-50 m-auto bg-body-tertiary rounded "
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="email"
        label={locales[lang].signIn.email}
        placeholder={locales[lang].signIn.emailPlaceholder}
        className="form-control mb-2 py-2"
        {...register('email')}
      />
      {errors.email && <p className="text-danger">{errors.email.message}</p>}
      <Input
        type="password"
        label={locales[lang].signIn.password}
        placeholder={locales[lang].signIn.passwordPlaceholder}
        className="form-control mb-3 py-2"
        {...register('password')}
      />
      {errors.password && <p className="text-danger">{errors.password.message}</p>}
      <div id="passwordHelpBlock" className="form-text mb-5 ">
        <a href="#" className="text-reset text-decoration-none">
          {locales[lang].signIn.forgotPassword}
        </a>
      </div>
      <Button>{locales[lang].signIn.signIn}</Button>
      <SignHint hint="sign-in" />
    </form>
  )
}
