import baseApi from "./apiBase.tsx";
import { UserCreate, User, UserUpdate } from "../Types/User.tsx";

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
  console.log(data);
  return data;
};
