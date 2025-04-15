import baseApi from "./apiBase.tsx";
import { UserCreate, UserGet } from "../Types/types.tsx";

export const createUser = async (user: UserCreate): Promise<UserGet> => {
  const { data }: { data: UserGet } = await baseApi.post<UserGet>(`/user`, {
    ...user,
  });
  return data;
};
