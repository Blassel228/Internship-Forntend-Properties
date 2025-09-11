import baseApi from "./apiBase.tsx";
import { UserCreate, UserGet, UserUpdate } from "../Types/User.tsx";

export const createUser = async (user: UserCreate): Promise<UserGet> => {
  const { data }: { data: UserGet } = await baseApi.post<UserGet>(`/user`, {
    ...user,
  });
  return data;
};

export const updateUser = async (
  userUpdate: Partial<UserUpdate>,
): Promise<UserGet> => {
  const { data }: { data: UserGet } = await baseApi.put<UserGet>("/user", {
    ...userUpdate,
  });
  console.log(data)
  return data;
};
