import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../Types/User.tsx";
import { ImageUpdate } from "../../Types/Image.tsx";

interface AuthorizedUserState {
  authorizedUser: User | null;
}

const initialState: AuthorizedUserState = {
  authorizedUser: null,
};

const authorizedUserSlice = createSlice({
  name: "authorizedUser",
  initialState,
  reducers: {
    setAuthorizedUser(state, action: PayloadAction<User>) {
      state.authorizedUser = action.payload;
    },
    clearAuthorizedUser(state) {
      state.authorizedUser = null;
    },
    setAuthorizedUserImage(state, action: PayloadAction<ImageUpdate>) {
      if (state.authorizedUser?.image_data)
        state.authorizedUser.image_data = action.payload.image_data;
      else state.authorizedUser.image_data = null;
    },
  },
});

export const {
  setAuthorizedUser,
  clearAuthorizedUser,
  setAuthorizedUserImage,
} = authorizedUserSlice.actions;
export default authorizedUserSlice.reducer;
