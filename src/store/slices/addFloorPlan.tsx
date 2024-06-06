import { createSlice } from '@reduxjs/toolkit';

export interface ItemData {
  name: string;
  alias: string;
  price: string;
  people: string;
  serveware: string;
}
interface FloorState {
  floorImage: string;
  items: ItemData[];
}

const initialState: FloorState = {
  floorImage: "",
  items: [],
};

interface SetFloorImageAction {
  payload: string;
}

interface SetFloorItemsAction {
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
    setFloorItems(state: FloorState, action: SetFloorItemsAction) {
      state.items = action.payload;
    },
  },
});

export default floorSlice.reducer;
export const { setFloorImage, setFloorItems } = floorSlice.actions;