import React from 'react'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import {useForm, type SubmitHandler} from 'react-hook-form'
import {fetchSignUp} from '../../redux/auth-slice'
import {useNavigate} from 'react-router'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'

import {Input} from '../input/Input.tsx'
import {Button} from '../button/Button'
import {SignHint} from '../sign-hint/SignHint'
import {locales} from '../../config/locales'

const SignUpSchema = z
  .object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    passwordConfirm: z.string().min(8, 'Password must be at least 8 characters long'),
  })
  .refine(data => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  })

type SignUpFormType = z.infer<typeof SignUpSchema>

export function SignUpForm(): React.ReactElement {
  const {lang} = useAppSelector(state => state.lang)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  })

  const onSubmit: SubmitHandler<SignUpFormType> = async data => {
    await dispatch(fetchSignUp(data))
    reset()
    navigate('/auth/sign-up-confirmation')
  }

  return (
    <form
      className="py-3 px-5 mt-2 w-50 m-auto bg-body-tertiary rounded"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="text"
        label={locales[lang].signUp.name}
        placeholder={locales[lang].signUp.namePlaceholder}
        className="form-control mb-2 py-2"
        {...register('username')}
      />
      {errors.username && <p className="text-danger">{errors.username.message}</p>}
      <Input
        type="email"
        label={locales[lang].signUp.email}
        placeholder={locales[lang].signUp.emailPlaceholder}
        className="form-control mb-2 py-2"
        {...register('email')}
      />
      {errors.email && <p className="text-danger">{errors.email.message}</p>}
      <Input
        type="password"
        label={locales[lang].signUp.password}
        placeholder={locales[lang].signUp.passwordPlaceholder}
        className="form-control mb-2 py-2"
        {...register('password')}
      />
      {errors.password && <p className="text-danger">{errors.password.message}</p>}
      <Input
        type="password"
        label={locales[lang].signUp.confirmPassword}
        placeholder={locales[lang].signUp.confirmPasswordPlaceholder}
        className="form-control mb-4 py-2"
        {...register('passwordConfirm')}
      />
      {errors.passwordConfirm && <p className="text-danger">{errors.passwordConfirm.message}</p>}
      <Button>{locales[lang].signUp.signUp}</Button>
      <SignHint hint="sign-up" />
    </form>
  )
}
