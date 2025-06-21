import {createSlice, createAsyncThunk, type PayloadAction} from '@reduxjs/toolkit'
import {requestSignUp, requestActivation, requestSignIn, requestRefresh} from '../services/auth'
import type {
  SignUpBodyType,
  UserType,
  AuthStateType,
  ActivationBodyType,
  SignInBodyType,
  JwtType,
} from '../types'
import {jwt} from '../utils/jwt'

export const fetchSignUp = createAsyncThunk(
  'auth/fetchSignUp',
  async (body: SignUpBodyType): Promise<UserType | void> => {
    const data = await requestSignUp(body)
    return data
  }
)

export const fetchActivation = createAsyncThunk(
  'auth/fetchActivation',
  async (body: ActivationBodyType): Promise<ActivationBodyType | void> => {
    const data = await requestActivation(body)
    return data
  }
)

export const fetchSignIn = createAsyncThunk('auth/fetchSignIn', async (body: SignInBodyType) => {
  const data = await requestSignIn(body)

  // Save JWT
  if (data) {
    jwt.setToLocalStorage(data)
  }

  return data
})

export const fetchRefresh = createAsyncThunk(
  'auth/fetchRefresh',
  async (body: Pick<JwtType, 'refresh'>) => {
    const data = await requestRefresh(body)
    let newJwt: JwtType | null = null

    if (data) {
      newJwt = {
        refresh: body.refresh,
        access: data.access,
      }

      jwt.setToLocalStorage(newJwt)
    }

    return newJwt
  }
)

export const authExit = createAsyncThunk('auth/authExit', async () => {
  jwt.clearJwt()

  return true
})

const initialState: AuthStateType = {
  email: null,
  isLoading: false,
  error: null,
  isSignedUp: false,
  isActivated: false,
  jwt: jwt.getFromLocalStorage(),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSignUp.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.error = action.error.message || null
        state.isLoading = false
      })
      .addCase(fetchSignUp.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.isSignedUp = true
        state.isLoading = false
        state.email = action.payload.email
      })
      .addCase(fetchActivation.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchActivation.rejected, (state, action) => {
        state.error = action.error.message || null
        state.isLoading = false
      })
      .addCase(fetchActivation.fulfilled, state => {
        state.isActivated = true
        state.isLoading = false
      })
      .addCase(fetchSignIn.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        state.error = action.error.message || null
        state.isLoading = false
      })
      .addCase(fetchSignIn.fulfilled, (state, action: PayloadAction<JwtType>) => {
        state.jwt = action.payload
        state.isLoading = false
      })
      .addCase(authExit.fulfilled, state => {
        state.jwt = null
      })
      .addCase(fetchRefresh.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchRefresh.rejected, (state, action) => {
        state.error = action.error.message || null
        state.isLoading = false
      })
      .addCase(fetchRefresh.fulfilled, (state, action: PayloadAction<JwtType>) => {
        state.jwt = action.payload
        state.isLoading = false
      })
  },
})

export const {setEmail} = authSlice.actions
export const authReducer = authSlice.reducer
