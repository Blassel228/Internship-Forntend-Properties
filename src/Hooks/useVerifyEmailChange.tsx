import { useMutation } from "@tanstack/react-query";
import { verifyEmailChange as verifyEmailChangeApi } from "../Api/apiEmail";
import { toast } from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {setAuthorizedUserEmail} from "../Store/slices/authorizedUserSlice.tsx";
import {VerifyEmailChangeResponse} from "../Types/Email.tsx";
import {RootState} from "../Types/RootState.tsx";
import {User} from "../Types/User.tsx";

function useVerifyEmailChange() {
  const dispatch = useDispatch();

  const {
    mutate: verifyEmailChange,
    isPending,
    error,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: (token: string) => verifyEmailChangeApi(token),
    onSuccess: (response: VerifyEmailChangeResponse) => {
      toast.success("Email successfully changed!");
      dispatch(setAuthorizedUserEmail({ email: response.user.email }))
    },
    onError: (error: any) =>
      toast.error(
        error?.response?.data?.detail ||
        "Failed to verify email change"
      ),
  });

  return {
    mutate: verifyEmailChange,
    isPending,
    error,
    isSuccess,
    isError
  };
}

export default useVerifyEmailChange;