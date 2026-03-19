import baseApi from "./apiBase.tsx";
import { User, UserCreate, UserUpdate } from "../Types/User.tsx";

export const createUser = async (user: UserCreate): Promise<User> => {
  const { data }: { data: User } = await baseApi.post<User>(`/user/`, {
    ...user,
  });
  return data;
};

export const selfUpdateUser = async (
  userUpdate: Partial<UserUpdate>,
): Promise<User> => {
  const { data }: { data: User } = await baseApi.put<User>("user/self-update", {
    ...userUpdate,
  });
  return data;
};

export const updateUser = async (
  userId: string,
  updatedData: Partial<UserUpdate>,
): Promise<User> => {
  const { data }: { data: User } = await baseApi.put<User>(`/user/${userId}`, {
    ...updatedData,
  });
  return data;
};

export const getUser = async (userId): Promise<User> => {
  const { data }: { data: User } = await baseApi.get<User>(`/user/${userId}`);
  return data;
};

export const getUsers = async (): Promise<User[]> => {
  const { data }: { data: User[] } = await baseApi.get<User[]>(`/user/`);
  return data;
};

export const deleteUser = async (userId: string): Promise<boolean> => {
  const { data }: { data: boolean } = await baseApi.delete<boolean>(
    `/user/${userId}`,
  );
  return data;
};
