import baseApi from "./apiBase.tsx";
import { Token, UserGet } from "../Types/types.tsx";

export async function loginGetToken(
  username: string,
  password: string,
): Promise<Token> {
  const response = await baseApi.post(
    `/auth/token/login`,
    new URLSearchParams({
      username: username,
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

export async function loginGetUserByToken(token: string): Promise<UserGet> {
  const response = await baseApi.get("/auth/user/me/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
