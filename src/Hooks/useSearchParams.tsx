import {useMemo} from "react";

const useBookingParams = () => {
  return useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return {
      startDate: searchParams.get("start_date") || "",
      endDate: searchParams.get("end_date") || "",
      capacity: searchParams.get("capacity") || "",
    };
  }, []);
};

export default useBookingParams;