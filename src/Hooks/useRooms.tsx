import { useQuery } from "@tanstack/react-query";
import { getRoomsWithFilter } from "../Api/apiRoom.tsx";
import { RoomFilters } from "../Types/Room.tsx";
import Room from "../Pages/Room.tsx";

export const useRoomsWithFilters = (filters: RoomFilters) => {
  const {
    data: roomsWithFilters,
    isLoading,
    error,
    isError,
  } = useQuery<Room[], Error>({
    queryKey: ["rooms", "filtered", filters],
    queryFn: async () => await getRoomsWithFilter(filters),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 60000,
  });
  return { roomsWithFilters, isLoading, error, isError };
};
