import {useMutation} from "@tanstack/react-query";
import {CreateRefundRequest} from "../Types/Payment.tsx";
import {refundBooking} from "../Api/apiPayment.tsx";

const useRefund = () =>
{
  const { mutate: createRefund, isPending, isError, error} =
    useMutation({
      mutationFn: (request: CreateRefundRequest) => refundBooking(request)
    }
  )
  return { createRefund, isPending, isError, error }
}

export default useRefund;