import { configureStore } from '@reduxjs/toolkit'
import LogRocket from 'logrocket';

import gaolReducer from '../features/gaol/gaolSlice'

export const store = configureStore({
  reducer: {
    gaol: gaolReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(LogRocket.reduxMiddleware())
})