import {sendVerificationEmail, verifyEmail} from "../Api/apiEmail.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import {useDispatch} from "react-redux";
import {setAuthorizedUserEmail} from "../Store/slices/authorizedUserSlice.tsx";



export const useVerifyEmail = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (token: string) => verifyEmail(token),
    onSuccess: (data) => {
      dispatch(setAuthorizedUserEmail({ is_verified: true }));

      queryClient.invalidateQueries({ queryKey: ["user"] });

      toast.success("Email verified successfully!");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.detail || "Invalid or expired verification token";
      toast.error(message);
    },
  });
};

export const useSendVerificationEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendVerificationEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Verification email sent successfully!");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.detail || "Failed to send verification email";
      toast.error(message);
    },
  });
};