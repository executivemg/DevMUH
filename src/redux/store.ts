import { configureStore } from '@reduxjs/toolkit';
import floorSlice from './reducers/floorSlice';

export const store = configureStore({
  reducer: {
    floorData: floorSlice, //.reducer
  },
});