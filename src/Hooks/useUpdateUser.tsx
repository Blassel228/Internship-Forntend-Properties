import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../Api/apiUser.tsx";
import { useDispatch } from "react-redux";
import {
  setAuthorizedUser,
  setAuthorizedUserImage,
} from "../Store/slices/authorizedUserSlice.tsx";
import { User, UserUpdate } from "../Types/User.tsx";
import { getImage } from "../Api/apiImage.tsx";
import { ImageGet } from "../Types/Image.tsx";

function useUpdateUser() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (userUpdate: Partial<UserUpdate>) => {
      return await updateUser(userUpdate);
    },
    onSuccess: async (user: User) => {
      dispatch(setAuthorizedUser(user));
      const image: ImageGet = await getImage();
      dispatch(setAuthorizedUserImage(image));
    },
  });
}

export default useUpdateUser;
