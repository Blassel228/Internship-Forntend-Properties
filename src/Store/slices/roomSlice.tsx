import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room } from "../../Types/types";

interface RoomState {
  rooms: Room[] | null;
}

const initialState: RoomState = {
  rooms: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    },
  },
});

export const { setRooms } = roomSlice.actions;

export default roomSlice.reducer;