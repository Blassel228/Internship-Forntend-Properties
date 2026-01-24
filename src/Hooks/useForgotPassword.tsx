import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../Api/apiAuth";
import { toast } from "react-hot-toast";

export default function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onSuccess: (response) => {
      toast.success("If your email is registered, you'll receive a reset link");
    },
    onError: () => {
      toast.success("If your email is registered, you'll receive a reset link");
    }
  });
}