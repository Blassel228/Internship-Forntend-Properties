import { useMutation } from "@tanstack/react-query";

import {createImage} from "../Api/apiImage.tsx";
import {useDispatch} from "react-redux";
import {setAuthorizedUserImage} from "../Store/slices/authorizedUserSlice.tsx";
import {ImageGet, ImageUpdate} from "../Types/Image.tsx";

function useCreateImage() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (file: File) => createImage(file),
    onSuccess: (image: ImageGet) => {
      dispatch(setAuthorizedUserImage({image_data: image.image_data} as ImageUpdate))
    }
  });
}

export default useCreateImage;
