import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom as deleteRoomApi } from "../../../Api/apiRoom.tsx";
import { toast } from "react-hot-toast";

function useDeleteRoom() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteRoom,
    isPending: isRoomDeleting,
    error: deletionError,
    isSuccess: deletionSuccess
  } = useMutation({
    mutationFn: async (room_id: string) => await deleteRoomApi(room_id),
    onSuccess: () => queryClient.invalidateQueries(["rooms", "filtered"]),
    onError: (err: any) => toast.error(err?.date?.message),
  });
  return { deleteRoom, isRoomDeleting, deletionError, deletionSuccess };
}

export default useDeleteRoom;
