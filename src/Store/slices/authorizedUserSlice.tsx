import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserGet } from "../../Types/types.tsx";

const initialState: { user: UserGet | null } = {
  user: null,
};

const authorizedUserSlice = createSlice({
  name: "authorizedUser",
  initialState,
  reducers: {
    setAuthorizedUser(state, action: PayloadAction<UserGet>) {
      state.user = action.payload;
    },
    clearAuthorizedUser(state) {
      state.user = null;
    },
    setProfileImage(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.profileImage = action.payload;
      }
    },
  },
});

export const { setAuthorizedUser, clearAuthorizedUser, setProfileImage } =
  authorizedUserSlice.actions;
export default authorizedUserSlice.reducer;
