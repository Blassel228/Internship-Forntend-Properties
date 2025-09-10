import baseApi from "./apiBase.tsx";
import {ImageGet} from "../Types/Image.tsx";

export const getImage = async (image_id: number): Promise<ImageGet> => {
    return await baseApi.get("/image/", {image_id: image_id})
}

export const createImage = async (file: File): Promise<ImageGet> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await baseApi.post("/image/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const updateImage = async (file: File): Promise<ImageGet> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await baseApi.put("/image/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
