// useDeleteImage.tsx
import { useMutation } from "@tanstack/react-query";
import { deleteImage } from "../Api/apiImage.tsx";
import { useDispatch } from "react-redux";
import { setAuthorizedUserImage } from "../Store/slices/authorizedUserSlice.tsx";
import { ImageUpdate } from "../Types/Image.tsx";
import { toast } from "react-hot-toast";

function useDeleteImage() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      dispatch(setAuthorizedUserImage({ image_data: null } as ImageUpdate));
      toast.success("Avatar deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete avatar");
    },
  });
}

export default useDeleteImage;