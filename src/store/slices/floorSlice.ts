// store/slices/floorSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the ItemData interface
export interface ItemData {
  name: string;
  alias: string;
  price: string;
  people: string;
  serveware: string;
  desc: string;
}

export interface CategoryData {
  category: string;
  price: string;
  number: number;
  desc: string;
}

interface FloorState {
  floorImage: File | null;
  items: ItemData[];
  mode: number;
  categories: CategoryData[];
}

const initialState: FloorState = {
  floorImage: null,
  items: [],
  mode: 0,
  categories: [],
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
    
    setFloorCategory(state: FloorState, action: PayloadAction<CategoryData[]>) {
      state.categories = action.payload;
    },

    setFloorMode(state: FloorState, action: PayloadAction<number>) {
      state.mode = action.payload;
    },
  },
});

export default floorSlice.reducer;
export const { setFloorImage, setFloorItems } = floorSlice.actions;