import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRating as createRatingApi } from "../Api/apiRating.tsx";

export const useCreateRating = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createRating,
    isPending: isRatingLoading,
    error: errorWhileCreatingRating,
  } = useMutation({
    mutationFn: async (room_id: string) => await createRatingApi(room_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["searchRooms"] });
    },
  });

  return { createRating, isRatingLoading, errorWhileCreatingRating };
};
