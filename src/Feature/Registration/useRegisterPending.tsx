import { useMutation } from "@tanstack/react-query";
import {registerUserPending} from "../../Api/apiAuth";
import {UserCreate} from "../../Types/User.tsx";

export default function useRegisterPending() {
  return useMutation({
    mutationFn: (userData: UserCreate) => registerUserPending(userData),
  });
}