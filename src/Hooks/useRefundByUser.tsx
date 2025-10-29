import { useMutation } from "@tanstack/react-query";
import { CreateRefundRequestByUser } from "../Types/Payment.tsx";
import { userRefundBooking } from "../Api/apiPayment.tsx";

const useRefundByUser = () => {
  const {
    mutate: createRefundByUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (request: CreateRefundRequestByUser) =>
      userRefundBooking(request),
  });
  return { createRefund: createRefundByUser, isPending, isError, error };
};

export default useRefundByUser;
