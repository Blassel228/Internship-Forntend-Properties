import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Types/User.tsx";
import { ImageUpdate } from "../../Types/Image.tsx";

interface AuthorizedUserState {
  authorizedUser: User | null;
}

const initialState: AuthorizedUserState = {
  authorizedUser: {
    image: { image_data: null },
  } as User,
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
      if (state.authorizedUser) {
        if (!state.authorizedUser.image) {
          state.authorizedUser.image = {
            image_data: action.payload.image_data,
          };
        } else {
          state.authorizedUser.image.image_data = action.payload.image_data;
        }
      }
    },
  },
});

export const {
  setAuthorizedUser,
  clearAuthorizedUser,
  setAuthorizedUserImage,
} = authorizedUserSlice.actions;
export default authorizedUserSlice.reducer;
