import type {UserType, SignUpBodyType, SignInBodyType, ActivationBodyType, JwtType} from '../types'
import {
  baseUrl,
  authSignUpEndpoint,
  authActivationEndpoint,
  authSignInEndpoint,
  authRefreshEndpoint,
} from '../config/api'
import {post} from '../config/client'
import {COURSE_GROUP} from '../config/constants'

export async function requestSignUp(body: SignUpBodyType): Promise<UserType | void> {
  const response = await post(baseUrl + authSignUpEndpoint, {
    ...body,
    course_group: COURSE_GROUP,
  } as SignUpBodyType)

  return response.data
}

export async function requestActivation(
  body: ActivationBodyType
): Promise<ActivationBodyType | void> {
  const response = await post(baseUrl + authActivationEndpoint, body)

  return response.data
}

export async function requestSignIn(body: SignInBodyType): Promise<JwtType | void> {
  const response = await post(baseUrl + authSignInEndpoint, body)

  return response.data
}

export async function requestRefresh(
  body: Pick<JwtType, 'refresh'>
): Promise<Pick<JwtType, 'access'> | void> {
  const response = await post(baseUrl + authRefreshEndpoint, body)

  return response.data
}
