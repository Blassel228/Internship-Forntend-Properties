import {useQuery} from "@tanstack/react-query";
import {getBooking, getBookingsForOneUser} from "../Api/apiBooking.tsx";
import {Booking} from "../Types/Booking.tsx";

export const useBookings = () => {
  const {data: bookings, isLoading, error} = useQuery<Booking[], Error>({
    queryKey: ["userBookings"],
    queryFn: getBookingsForOneUser,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 60000,
  });
  return { bookings, isLoading, error };
};


export function useBooking(bookingId) {
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isLoading, error, booking };
}
