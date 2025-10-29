import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  selfUpdateUser as selfUpdateUserApi,
  updateUser as updateUserApi,
} from "../Api/apiUser.tsx";
import { useDispatch } from "react-redux";
import {
  setAuthorizedUser,
  setAuthorizedUserImage,
} from "../Store/slices/authorizedUserSlice.tsx";
import { User, UserUpdate } from "../Types/User.tsx";
import { getImage } from "../Api/apiImage.tsx";
import { ImageGet } from "../Types/Image.tsx";
import { toast } from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending: isUserUpdating,
    error: userUpdateError,
  } = useMutation({
    mutationFn: async ({
      userId,
      updatedData,
    }: {
      userId: string;
      updatedData: Partial<UserUpdate>;
    }) => await updateUserApi(userId, updatedData),
    onSuccess: async () =>
      queryClient.invalidateQueries({ queryKey: ["users"] }),
    onError: async (error) =>
      toast.error(error?.data?.message || "Something went wrong"),
  });

  return { updateUser, isUserUpdating, userUpdateError };
}

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

export { useUpdateAuthorizedUser, useUpdateUser };
