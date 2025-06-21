import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {TabsState} from '../types'

const initialState: TabsState = {
  activeIndex: null,
}

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload
    },
  },
})

export const {setActiveTab} = tabsSlice.actions
export const tabsReducer = tabsSlice.reducer
