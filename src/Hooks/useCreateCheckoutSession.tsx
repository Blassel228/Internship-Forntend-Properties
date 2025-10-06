import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCheckoutSessionWithoutToken,
  createCheckoutSessionWithToken,
} from "../Api/apiPayment.tsx";
import { CreateCheckoutSessionRequest } from "../Types/Payment.tsx";

export function useCreateCheckoutSessionWithToken(): string {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCheckoutSessionRequest) => {
      return createCheckoutSessionWithToken(data);
    },
    onSuccess: (result: string) => {
      queryClient.invalidateQueries({ queryKey: ["userBookings"] });
      return result;
    },
  });
}

export function useCreateCheckoutSessionWithoutToken(): string {
  return useMutation({
    mutationFn: (data: CreateCheckoutSessionRequest) => {
      return createCheckoutSessionWithoutToken(data);
    },
    onSuccess: (result: string) => {
      return result;
    },
  });
}
