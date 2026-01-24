import { useMutation } from "@tanstack/react-query";
import {UserCreate} from "../../Types/User.tsx";

import {registerUserPending} from "../../Api/apiAuth.tsx";

export default function useRegisterPending() {
  return useMutation({
    mutationFn: (userData: UserCreate) => registerUserPending(userData),
  });
}