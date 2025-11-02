import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateRefundRequestByUser } from "../Types/Payment.tsx";
import { userRefundBooking } from "../Api/apiPayment.tsx";

const useRefundByUser = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createRefundByUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (request: CreateRefundRequestByUser) =>
      userRefundBooking(request),
    onSuccess: async () =>
      await queryClient.invalidateQueries(["userBookings"]),
  });
  return { createRefund: createRefundByUser, isPending, isError, error };
};

export default useRefundByUser;
