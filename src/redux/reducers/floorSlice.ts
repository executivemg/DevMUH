import { createSlice } from '@reduxjs/toolkit';

export interface ItemData {
  name: string;
  alias: string;
  price: string;
  people: string;
  bottles: string;
}
interface FloorState {
  floorImage: File;
  items: ItemData[];
}

const initialState: FloorState = {
  floorImage: null,
  items: [],
};

interface SetFloorImageAction {
  payload: File;
}

interface SetItemsAction {
  payload: ItemData[];
}

// :::::::::::::::::::::::::::: MAIN SLICE
const floorSlice = createSlice({
  name: 'floorData',
  initialState,
  reducers: {
    setFloorImage(state: FloorState, action: SetFloorImageAction) {
      state.floorImage = action.payload;
    },
    setItems(state: FloorState, action: SetItemsAction) {
      state.items = action.payload;
    },
  },
});

export default floorSlice.reducer;
export const { setFloorImage, setItems } = floorSlice.actions;
