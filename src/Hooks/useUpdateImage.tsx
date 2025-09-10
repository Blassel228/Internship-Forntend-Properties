import { useMutation } from "@tanstack/react-query";

import {updateImage} from "../Api/apiImage.tsx";
import {ImageGet, ImageUpdate} from "../Types/Image.tsx"
import {useDispatch} from "react-redux";
import {setAuthorizedUserImage} from "../Store/slices/authorizedUserSlice.tsx";

function useUpdateImage() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (file: File) => updateImage(file),
    onSuccess: (image: ImageGet) => {
      dispatch(setAuthorizedUserImage({image_data: image.image_data} as ImageUpdate))
    }
  });
}

export default useUpdateImage;
