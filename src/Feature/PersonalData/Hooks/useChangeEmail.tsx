import { useMutation } from "@tanstack/react-query";
import { changeEmail as changeEmailApi } from "../../../Api/apiEmail.tsx";
import { toast } from "react-hot-toast";
import {ChangeEmailRequest} from "../../../Types/Email.tsx";

function useChangeEmail() {
  const {
    mutate: changeEmail,
    isPending: isEmailChanging,
    error: emailChangeError,
  } = useMutation({
    mutationFn: (changeEmailRequest: ChangeEmailRequest) => changeEmailApi(changeEmailRequest),
    onSuccess: () => toast.success("Message with email change notification has been sent"),
    onError: (error: any) =>
      toast.error(
        error?.response?.data?.detail ||
        "Failed to request email change"
      ),
  });

  return { changeEmail, isEmailChanging, emailChangeError };
}

export default useChangeEmail;