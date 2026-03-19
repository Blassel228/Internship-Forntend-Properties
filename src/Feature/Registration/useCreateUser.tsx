import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../Api/apiUser.tsx";
import { UserCreate } from "../../Types/User.tsx";

function useCreateUser() {
  return useMutation({
    mutationFn: ({ user }: { user: UserCreate }) => createUser(user),
    onError: (error: any, _) => {
      if (error.response?.data?.error?.detail) {
        const fieldErrors = error.response.data.error.detail;
        return {
          fieldErrors,
        };
      }
      return {
        generalError: "An unexpected error occurred",
      };
    },
  });
}

export default useCreateUser;
