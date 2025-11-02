import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RoomCreate } from "../../../Types/Room.tsx";
import { toast } from "react-hot-toast";
import { createRoom as createRoomApi } from "../../../Api/apiRoom.tsx";

function useCreateRoom() {
  const queryClient = useQueryClient();
  const {
    mutate: createRoom,
    isPending: isRoomCreating,
    error: errorRoomCreating,
  } = useMutation({
    mutationFn: async ({ room, image }: { room: RoomCreate; image: File }) =>
      await createRoomApi(room, image),
    onSuccess: () => queryClient.invalidateQueries(["bookings"]),
    onError: (err: any) =>
      toast.error(err?.date?.detail ? err.date.detail : "Something went wrong"),
  });
  return { createRoom, isRoomCreating, errorRoomCreating };
}

export default useCreateRoom;
