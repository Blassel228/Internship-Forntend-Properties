import baseApi from "./apiBase.tsx";
import { Token } from "../Types/Token.tsx";
import { User } from "../Types/User.tsx";
import {ResetPasswordRequest} from "../Types/auth.tsx";

export async function registerUserPending(userData: {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  phone_number: string;
}): Promise<void> {
  await baseApi.post("/auth/register-pending", userData);
}

export async function verifyAndCreateUser(token: string): Promise<void> {
  await baseApi.get(`/auth/verify-and-create?token=${token}`);
}

export async function loginGetToken(
  username_or_email: string,
  password: string,
): Promise<Token> {
  const response = await baseApi.post(
    `/auth/token/login`,
    new URLSearchParams({
      username: username_or_email,
      password: password,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  return response.data;
}

export async function loginGetUserByToken(token: string): Promise<User> {
  const response = await baseApi.get("/auth/user/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function refreshToken() {
  const { data } = await baseApi.post("/auth/refresh");
  return data;
}


export async function forgotPassword(email: string): Promise<void> {
  await baseApi.post("/auth/forgot-password", { email });
}

export async function resetPassword(data: ResetPasswordRequest): Promise<void> {
  await baseApi.post("/auth/reset-password", data);
}