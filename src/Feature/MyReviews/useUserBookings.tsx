import { useQuery } from "@tanstack/react-query";
import {
  getBookingsForOneUser,
  getBookingsNotRatedByUser,
} from "../../Api/apiBooking.tsx";
import { Booking } from "../../Types/Booking.tsx";

export const useBookings = () => {
  const {
    data: bookings,
    isLoading,
    error,
  }: { bookings: Booking[] } = useQuery<Booking[], Error>({
    queryKey: ["userBookings"],
    queryFn: getBookingsForOneUser,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 60000,
  });
  return { bookings: bookings ?? [], isLoading, error };
};

export const useGetBookingsForRoomsNotRatedByUser = () => {
  const {
    data: notRatedBookings,
    isLoading: areNotRatedBookingsLoading,
    error: notRatedBookingsError,
  } : { notRatedBookings: Booking[] } = useQuery<Booking[], Error>({
    queryKey: ["notRatedRoomsBookings"],
    queryFn: async () => await getBookingsNotRatedByUser(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 60000,
    cacheTime: 0,
  });
  return {
    notRatedBookings: notRatedBookings ?? [],
    areNotRatedBookingsLoading,
    notRatedBookingsError,
  };
};
