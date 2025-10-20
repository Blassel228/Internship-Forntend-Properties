import {useQuery} from "@tanstack/react-query";
import {getRoomsBookedNotRatedByUser, getRoomsWithFilter,} from "../Api/apiRoom.tsx";
import {RoomFilters} from "../Types/Room.tsx";
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

export const useGetRoomsBookedNotRatedByUser = () => {
  const {
    data: notRatedRooms,
    isLoading,
    error,
    isError,
  } = useQuery<Room[], Error>({
    queryKey: ["notRatedRooms"],
    queryFn: async () => await getRoomsBookedNotRatedByUser(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 60000,
    cacheTime: 0,
  });
  return { notRatedRooms, isLoading, error, isError };
};
