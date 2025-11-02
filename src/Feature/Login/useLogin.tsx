import { useMutation } from "@tanstack/react-query";
import useNavigation from "../../Utils/navigate.tsx";
import routers from "../../Constants/routers.tsx";
import useAuth from "../../Hooks/useAuth.tsx";

const useLogin = () => {
  const { login: signIn } = useAuth();
  const { goTo } = useNavigation();
  const {
    mutate: login,
    error: loginError,
    status: loginStatus,
  } = useMutation({
    mutationFn: async ({
      username_or_email,
      password,
    }: {
      username_or_email: string;
      password: string;
    }) => {
      await signIn(username_or_email, password);
    },
    onSuccess: () => goTo(routers.home),
    onError: (error) => console.log("ERROR: ", error),
  });
  return { login, loginError, loginStatus };
};

export default useLogin;
