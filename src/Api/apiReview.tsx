import baseApi from "./apiBase.tsx";
import { Review, ReviewCreateRequest } from "../Types/Review.tsx";
import RatingFilters from "../Enums/ratingFilters.tsx";
import {AverageRating} from "../Types/AverageRating.tsx";

export const createRating = async (
  rating: ReviewCreateRequest,
): Promise<Review> => {
  const { data } = await baseApi.post("/review/", rating);
  return data;
};

export const getAverageRating = async (room_id: string): AverageRating => {
  const { data } : AverageRating = await baseApi.get(`/review/rooms/${room_id}/average`);
  return data;
};

export const getAverageRatings = async (): Promise<Review> => {
  const { data } = await baseApi.get(`/review/average`);
  return data;
};

export const getReviewsForRoom = async (
  roomId: string,
  offset: number,
  limit: number,
  sort: RatingFilters = RatingFilters.BEST,
) => {
  const { data } = await baseApi.get(`/review/rooms/${roomId}`, {
    params: { sort: sort, limit: limit, offset: offset },
  });
  return data;
};

export const getReviewCount = async (roomId: string) => {
  const { data } = await baseApi.get(`/review/count/rooms/${roomId}`);
  console.log("DATA: ", data);
  return data;
};
