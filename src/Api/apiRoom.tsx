import baseApi from "./apiBase.tsx";
import { Room } from "../Types/types.tsx";

export const getRooms = async (
  offset?: number,
  limit?: number
): Promise<Room[]> => {
  const { data }:{data: Room[]} = await baseApi.get<Room[]>("/room", {
    params: { offset, limit },
  });
  return data;
};