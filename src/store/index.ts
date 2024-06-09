import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import floorSlice from './slices/floorSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        floorData: floorSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch