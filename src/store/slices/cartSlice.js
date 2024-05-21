import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.interestedInCustomDomain === item.interestedInCustomDomain);

      if (!existingItem) {
        state.items.push({ ...item });
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.interestedInCustomDomain !== itemId);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
