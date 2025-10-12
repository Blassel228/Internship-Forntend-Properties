import baseApi from "./apiBase.tsx";
import { Rating, RatingCreateRequest } from "../Types/Rating.tsx";

export const createRating = (rating: RatingCreateRequest): Promise<Rating> => {
  const { data } = baseApi.post("/rating/", rating);
  return data;
};

export const getAverageRating = (room_id: string): Promise<Rating> => {
  const { data } = baseApi.get(`/rating/rooms/${room_id}/average`);
  return data;
};

export const getAverageRatings = (): Promise<Rating> => {
  const { data } = baseApi.get(`/rating/average`);
  return data;
};
