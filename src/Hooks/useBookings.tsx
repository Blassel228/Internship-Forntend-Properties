import { useQuery } from "@tanstack/react-query";
import { getBookingsForOneUser } from "../Api/apiBooking.tsx";
import { Booking } from "../Types/Booking.tsx";

const useBookings = () => {
  const {data: bookings, isLoading, error} = useQuery<Booking[], Error>({
    queryKey: ["userBookings"],
    queryFn: getBookingsForOneUser,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 60000,
  });
  return { bookings, isLoading, error };
};

export default useBookings;