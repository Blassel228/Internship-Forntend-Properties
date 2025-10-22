import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import { deleteUser as deleteUserApi } from "../Api/apiUser.tsx"

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isPending: isUsersLoading, error: deletionError, isSuccess } = useMutation({
    mutationFn: async (userId: string) => await deleteUserApi(userId),
    onSuccess: async () => await queryClient.invalidateQueries(["users"]),
    onError: (err: any) => toast.error(err?.date?.message || "Something went wrong")
  })

  return { deleteUser, isUsersLoading, deletionError, isSuccess };
}

export default useDeleteUser;