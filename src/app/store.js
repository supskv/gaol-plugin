import { configureStore } from '@reduxjs/toolkit';
import gaolReducer from '../features/gaol/gaolSlice';

export const store = configureStore({
  reducer: {
    gaol: gaolReducer,
  },
});