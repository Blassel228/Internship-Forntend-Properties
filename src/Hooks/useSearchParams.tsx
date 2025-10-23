import { useLocation } from "react-router-dom";

const useBookingParams = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  return {
    startDate: searchParams.get("start_date") || "",
    endDate: searchParams.get("end_date") || "",
    capacity: searchParams.get("capacity") || "",
  };
};

export default useBookingParams;
