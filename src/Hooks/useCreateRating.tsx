import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import {createRating} from "../Api/apiReview.tsx";
import {ReviewCreateRequest} from "../Types/Review.tsx";

function useCreateRating() {
  const queryClient = useQueryClient();

  const {
    mutate: addRating,
    isPending: isRatingCreating,
    error: creationError,
  } = useMutation({
    mutationFn: async (rating: ReviewCreateRequest) =>
      await createRating(rating),
    onSuccess: () => {
      toast.success("Rating created successfully");
      queryClient.invalidateQueries(["ratings"]);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create rating");
    },
  });

  return { addRating, isRatingCreating, creationError };
}

export default useCreateRating;
