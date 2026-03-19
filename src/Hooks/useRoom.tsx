import { useQuery } from "@tanstack/react-query";
import { getRoom } from "../Api/apiRoom.tsx";

const useRoom = (room_id: string) => {
  const {
    data: room,
    isLoading: isRoomLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["room", room_id],
    queryFn: () => {
      return getRoom(room_id);
    },
    enabled: !!room_id,
    staleTime: 5 * 60 * 1000,
  });

  return { room, isRoomLoading, error, isError };
};

export default useRoom;
