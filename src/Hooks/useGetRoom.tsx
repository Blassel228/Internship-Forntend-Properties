import {useQuery} from "@tanstack/react-query";
import {getRoom} from "../Api/apiRoom.tsx";

function useGetRoom(room_id: string) {
  const {
    data: room,
    isLoading: isRoomLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["room", room_id],
    queryFn: async () => await getRoom(room_id),
    enabled: !!room_id,
  });

  return { room, isRoomLoading, isError, error };
}

export default useGetRoom;
