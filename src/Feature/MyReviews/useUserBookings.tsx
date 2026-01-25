import { useQuery } from "@tanstack/react-query";
import {
  getBookingsForOneUser,
  getBookingsNotRatedByUser,
} from "../../Api/apiBooking.tsx";
import { Booking } from "../../Types/Booking.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../Store/store.tsx";

export const useBookings = () => {
  const userId = useSelector((state: RootState) => state.authorizedUser.authorizedUser?.id);

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery<Booking[], Error>({
    queryKey: ["userBookings", userId],
    queryFn: () => getBookingsForOneUser(),
    enabled: !!userId,
    staleTime: 60000,
  });

  return { bookings: bookings ?? [], isLoading, error };
};

export const useGetBookingsForRoomsNotRatedByUser = () => {
  const userId = useSelector((state: RootState) => state.authorizedUser.authorizedUser?.id);

  const {
    data: notRatedBookings,
    isLoading: areNotRatedBookingsLoading,
    error: notRatedBookingsError,
  } : { notRatedBookings: Booking[] } = useQuery<Booking[], Error>({
    queryKey: ["notRatedRoomsBookings", userId],
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
