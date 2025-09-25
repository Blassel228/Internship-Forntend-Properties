import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {UserGet} from "../../Types/User.tsx";
import {ImageUpdate} from "../../Types/Image.tsx";

interface AuthorizedUserState {
  authorizedUser: UserGet | null;
}

const initialState: AuthorizedUserState = {
  authorizedUser: null,
};

const authorizedUserSlice = createSlice({
  name: "authorizedUser",
  initialState,
  reducers: {
    setAuthorizedUser(state, action: PayloadAction<UserGet>) {
      state.authorizedUser = action.payload;
    },
    clearAuthorizedUser(state) {
      state.authorizedUser = null;
    },
    setAuthorizedUserImage(state, action: PayloadAction<ImageUpdate>) {
      if (state.authorizedUser) {
        state.authorizedUser.image_data = action.payload.image_data;
      }
    },
  },
});

export const { setAuthorizedUser, clearAuthorizedUser, setAuthorizedUserImage } =
  authorizedUserSlice.actions;
export default authorizedUserSlice.reducer;
