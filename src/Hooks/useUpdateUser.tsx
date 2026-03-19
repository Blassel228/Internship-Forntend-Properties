import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../Api/apiUser.tsx";
import { UserUpdate } from "../Types/User.tsx";
import { toast } from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending: isUserUpdating,
    error: userUpdateError,
  } = useMutation({
    mutationFn: async ({
      userId,
      updatedData,
    }: {
      userId: string;
      updatedData: Partial<UserUpdate>;
    }) => await updateUserApi(userId, updatedData),
    onSuccess: async () =>
      queryClient.invalidateQueries({ queryKey: ["users"] }),
    onError: async (error) =>
      toast.error(error?.data?.message || "Something went wrong"),
  });

  return { updateUser, isUserUpdating, userUpdateError };
}

export { useUpdateUser };
