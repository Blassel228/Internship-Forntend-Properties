import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../Api/apiBooking.tsx";
import { BookingCreate, GuestCreate } from "../Types/types.tsx";

function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ booking, guest }: { booking: BookingCreate; guest: GuestCreate }) =>
      createBooking(booking, guest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBookings"] });
    },
  });
}

export default useCreateBooking;
