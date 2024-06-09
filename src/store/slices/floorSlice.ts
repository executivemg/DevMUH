// store/slices/floorSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the ItemData interface
export interface ItemData {
  name: string;
  alias: string;
  price: string;
  people: string;
  serveware: string;
}

interface FloorState {
  floorImage: File | null;
  items: ItemData[];
}

const initialState: FloorState = {
  floorImage: null,
  items: [],
};

const floorSlice = createSlice({
  name: 'floorData',
  initialState,
  reducers: {
    setFloorImage(state: FloorState, action: PayloadAction<File>) {
      state.floorImage = action.payload;
    },

    setFloorItems(state: FloorState, action: PayloadAction<ItemData[]>) {
      state.items = action.payload;
    },
  },
});

export default floorSlice.reducer;
export const { setFloorImage, setFloorItems } = floorSlice.actions;