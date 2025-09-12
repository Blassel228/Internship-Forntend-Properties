import baseApi from "./apiBase.tsx";
import { CreateCheckoutSessionRequest } from "../Types/Payment.tsx";

export const createCheckoutSessionWithToken = async (
  data: CreateCheckoutSessionRequest
): Promise<{ url: string }> => {
  const { data: response } = await baseApi.post<{ url: string }>(
    `/payment/create-checkout-session-with-token`,
    data
  );
  return response;
};

export const createCheckoutSessionWithoutToken = async (
  data: CreateCheckoutSessionRequest
): Promise<{ url: string }> => {
  const { data: response } = await baseApi.post<{ url: string }>(
    `/payment/create-checkout-session-without-token`,
    data
  );
  return response;
};