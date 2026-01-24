import { useMutation } from "@tanstack/react-query";


import {verifyAndCreateUser} from "../Api/apiAuth.tsx";

export default function useVerifyAndCreate() {
  return useMutation({
    mutationFn: (token: string) => verifyAndCreateUser(token)
  });
}