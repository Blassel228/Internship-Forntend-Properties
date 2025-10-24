import baseApi from "./apiBase.tsx";
import { ImageGet } from "../Types/Image.tsx";

export const getImage = async (): Promise<ImageGet> => {
  const response = await baseApi.get("/image/");
  return response.data;
};

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

export const deleteImage = async (): Promise<boolean> => {
  return await baseApi.delete("/image/");
};