import baseApi from "./apiBase.tsx";
import {ChangeEmailRequest, ChangeEmailResponse, VerifyEmailChangeResponse} from "../Types/Email.tsx";

export async function verifyEmailChange(token: string): Promise<VerifyEmailChangeResponse> {
  const { data }:{ data: VerifyEmailChangeResponse } = await baseApi.get<VerifyEmailChangeResponse>(`/email/verify-email-change?token=${token}`);
  return data;
}

export async function changeEmail(
  changeEmailRequest: ChangeEmailRequest
): Promise<ChangeEmailResponse> {
  const { data } = await baseApi.post<ChangeEmailResponse>(
    "/email/me/change-email",
      changeEmailRequest
  );
  return data;
}