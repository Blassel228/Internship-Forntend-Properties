import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createRating as createRatingApi} from "../Api/apiRating.tsx";
import {RatingCreateRequest} from "../Types/Rating.tsx";

export const useCreateRating = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createRating,
    isPending: isRatingCreating,
    error: errorWhileCreatingRating,
  } = useMutation({
    mutationFn: async (rating: RatingCreateRequest) =>
      await createRatingApi(rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notRatedRoomsBookings"] });
      queryClient.invalidateQueries({ queryKey: ["userBookings"] });
      queryClient.refetchQueries({ queryKey: ["notRatedRoomsBookings"] });
    },
  });

  return { createRating, isRatingCreating, errorWhileCreatingRating };
};
