import {useMutation, useQueryClient} from "@tanstack/react-query";

import {adminCreate, adminUpdate, updateImage} from "../Api/apiImage.tsx";
import { ImageGet, ImageUpdate } from "../Types/Image.tsx";
import { useDispatch } from "react-redux";
import { setAuthorizedUserImage } from "../Store/slices/authorizedUserSlice.tsx";
import {toast} from "react-hot-toast";

function useUpdateImage() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (file: File) => updateImage(file),
    onSuccess: (image: ImageGet) => {
      dispatch(
        setAuthorizedUserImage({ image_data: image.image_data } as ImageUpdate),
      );
    },
  });
}

export function useAdminUpdateImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, userId }: { file: File; userId: string }) =>
      adminUpdate(file, userId),
    onSuccess: async () =>
      queryClient.invalidateQueries({ queryKey: ["users"] }),
    onError: async (error) =>
      toast.error(error?.data?.message || "Something went wrong"),
  });
}


export function useAdminCreateImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, userId }: { file: File; userId: string }) =>
      adminCreate(file, userId),
    onSuccess: async () =>
      queryClient.invalidateQueries({ queryKey: ["users"] }),
    onError: async (error) =>
      toast.error(error?.data?.message || "Something went wrong"),
  });
}


export default useUpdateImage;
