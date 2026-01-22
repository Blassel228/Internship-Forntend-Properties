import baseApi from "./apiBase.tsx";

export async function verifyEmail(token: string) {
  const { data } = await baseApi.get("/email/verify-email", {params: {token: token}});
  return data;
}

export async function sendVerificationEmail(){
  const { data } = await baseApi.post("/email/send-verification-email");
  return data;
}