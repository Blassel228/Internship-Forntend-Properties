import baseApi from "./apiBase.tsx";
import {Token} from "../Types/Token.tsx";
import {UserGet} from "../Types/User.tsx";

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

export async function refreshToken(){
  const { data } = await baseApi.post('/auth/refresh');
  return data;
}
