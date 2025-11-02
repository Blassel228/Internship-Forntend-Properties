import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking as updateBookingApi } from "../../Api/apiBooking.tsx";
import { UpdateBooking } from "../../Types/Booking.tsx";

function useUpdateBooking() {
  const queryClient = useQueryClient();

  const {
    mutate: updateBooking,
    isPending: isBookingUpdating,
    error: updateBookingError,
  } = useMutation({
    mutationFn: async ({
      bookingId,
      updatedData,
    }: {
      bookingId: string;
      updatedData: Partial<UpdateBooking>;
    }) => await updateBookingApi(bookingId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBookings"] });
      toast.success("Booking updated successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update booking");
    },
  });

  return { updateBooking, isBookingUpdating, updateBookingError };
}

export default useUpdateBooking;
