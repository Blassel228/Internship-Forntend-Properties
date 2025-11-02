import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { User, UserUpdate } from "../../../Types/User.tsx";
import { selfUpdateUser as selfUpdateUserApi } from "../../../Api/apiUser.tsx";
import {
  setAuthorizedUser,
  setAuthorizedUserImage,
} from "../../../Store/slices/authorizedUserSlice.tsx";
import { ImageGet } from "../../../Types/Image.tsx";
import { getImage } from "../../../Api/apiImage.tsx";

function useUpdateAuthorizedUser() {
  const dispatch = useDispatch();

  const {
    mutate: updateUser,
    isPending: isUserUpdating,
    error: userUpdateError,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (userUpdate: Partial<UserUpdate>) =>
      await selfUpdateUserApi(userUpdate),
    onSuccess: async (user: User) => {
      dispatch(setAuthorizedUser(user));

      try {
        const image: ImageGet | null = await getImage();

        if (image && image.image_data) {
          dispatch(setAuthorizedUserImage(image));
        } else {
          dispatch(setAuthorizedUserImage({ image_data: null }));
        }
      } catch (err) {
        console.warn("No image found for user, setting null");
        dispatch(setAuthorizedUserImage({ image_data: null }));
      }
    },
  });
  return { updateUser, isUserUpdating, userUpdateError, isError, isSuccess };
}

export { useUpdateAuthorizedUser };
