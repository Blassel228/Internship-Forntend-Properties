import { useMutation } from "@tanstack/react-query";
import { verifyAndCreateUser } from "../../Api/apiAuth";

export default function useVerifyAndCreate() {
  return useMutation({
    mutationFn: (token: string) => verifyAndCreateUser(token)
  });
}