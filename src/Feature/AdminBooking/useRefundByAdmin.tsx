import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminRefundBooking } from "../../Api/apiPayment.tsx";
import { CreateRefundRequestByAdmin } from "../../Types/Payment.tsx";
import { toast } from "react-hot-toast";

const useRefundByAdmin = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createRefundByAdmin,
    isPending,
    isError,
    error,
    reset
  } = useMutation({
    mutationFn: (request: CreateRefundRequestByAdmin) =>
      adminRefundBooking(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBookings"] });
      toast.success("Booking deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete booking");
    },
  });
  return { createRefundByAdmin, isPending, isError, error, reset };
};

export default useRefundByAdmin;
