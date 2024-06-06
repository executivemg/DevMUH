import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import floorSlice from './slices/addFloorPlan';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        floorData: floorSlice,
    },
});

export default store;
