import {useMutation} from "@tanstack/react-query";
import {getRoom} from "../Api/apiRoom.tsx";


function useGetRoom() {
  const { data: room, isPending } = useMutation({
    mutationFn: (room_id: string) => getRoom(room_id),
  })
  return { room, isPending };
}

export default useGetRoom;
