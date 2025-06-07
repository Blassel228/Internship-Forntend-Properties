import baseApi from "./apiBase.tsx";
import { Room } from "../Types/types.tsx";

export const getRooms = async (): Promise<Room[]> => {
  const { data }: { data: Room[] } =
    await baseApi.get<Room[]>(`/room`);
  return data;
};
