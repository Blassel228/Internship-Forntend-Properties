import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserGet } from "../../Types/types.tsx";

const initialState: { authorizedUser: UserGet | null } = {
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
    setProfileImage(state, action: PayloadAction<string>) {
      if (state.authorizedUser) {
        state.authorizedUser.profileImage = action.payload;
      }
    },
  },
});

export const { setAuthorizedUser, clearAuthorizedUser, setProfileImage } =
  authorizedUserSlice.actions;
export default authorizedUserSlice.reducer;
