import baseApi from "./apiBase.tsx";
import { User, UserCreate, UserUpdate } from "../Types/User.tsx";

export const createUser = async (user: UserCreate): Promise<User> => {
  const { data }: { data: User } = await baseApi.post<User>(`/user`, {
    ...user,
  });
  return data;
};

export const updateUser = async (
  userUpdate: Partial<UserUpdate>,
): Promise<User> => {
  const { data }: { data: User } = await baseApi.put<User>("/user", {
    ...userUpdate,
  });
  return data;
};

export const getUser = async (userId): Promise<User> => {
  const { data }: { data: User } = await baseApi.get<User>(`/user/${userId}`);
  console.log("DATA", data);
  return data;
};
