import {useMutation} from "@tanstack/react-query";
import {UserCreate} from "../Types/types.tsx";
import {createUser} from "../Api/apiUser.tsx";

function useCreateUser(){
  return useMutation({
    mutationFn: ({ user }: { user: UserCreate }) => createUser(user),
    onError: (error: any, _, context) => {
      if (error.response?.data?.detail) {
        console.error("ERROR:", error);
        const fieldErrors = error.response.data.detail;
        return {
          fieldErrors,
        };
      }
      return {
        generalError: "An unexpected error occurred",
      };
    },
  })
}

export default useCreateUser;