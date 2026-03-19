import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../Api/apiBooking.tsx";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteBooking,
    isPending: isBookingDeleting,
    error: deleteBookingError,
    isSuccess: deletionSuccess,
  } = useMutation({
    mutationFn: async ({ bookingId }: { bookingId: string }) =>
      await deleteBookingApi(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBookings"] });
      toast.success("Booking deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete booking");
    },
  });

  return { deleteBooking, isBookingDeleting, deleteBookingError, deletionSuccess };
}

export default useDeleteBooking;
