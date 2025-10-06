import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoom as updateRoomApi } from "../Api/apiRoom";
import { toast } from "react-hot-toast";
import { RoomUpdate } from "../Types/Room";

interface UpdateRoomParams {
  roomId: string;
  updatedData: RoomUpdate;
}

function useUpdateRoom() {
  const queryClient = useQueryClient();

  const {
    mutate: updateRoom,
    isPending: isRoomUpdating,
    error,
  } = useMutation({
    mutationFn: ({ roomId, updatedData }: UpdateRoomParams) =>
      updateRoomApi(roomId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms", "filtered"] });
      toast.success("Room successfully updated");
    },
    onError: (err: any) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  return { updateRoom, isRoomUpdating, error };
}

export default useUpdateRoom;
