import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../Api/apiAuth";
import { toast } from "react-hot-toast";
import {ResetPasswordRequest} from "../Types/auth.tsx";
import routers from "../Constants/routers.tsx";

export default function useResetPassword() {
  return useMutation({
    mutationFn: ( data: ResetPasswordRequest ) =>
      resetPassword(data),
    onSuccess: () => {
      toast.success("Password updated! Redirecting to login...");
      setTimeout(() => {
        window.location.href = routers.login;
      }, 2000);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail ||
        "Invalid or expired reset link"
      );
    }
  });
}