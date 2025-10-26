import { useQuery } from "@tanstack/react-query";
import {getBookings} from "../Api/apiBooking.tsx";
import {Booking} from "../Types/Booking.tsx";

const useBookings = () => {
  const {
    data: bookings,
    isLoading: areBookingsLoading,
    error: bookingsError,
    isError,
  } = useQuery<Booking[], Error>({
    queryKey: ["adminBookings"],
    queryFn: async () => await getBookings(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 60000,
  });
  return { bookings, areBookingsLoading, bookingsError, isError };
};

export default useBookings;