import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../Api/apiUser.tsx";
import { useDispatch } from "react-redux";
import { setAuthorizedUser } from "../Store/slices/authorizedUserSlice.tsx";
import { UserGet, UserUpdate } from "../Types/User.tsx";

function useUpdateUser() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (userUpdate: Partial<UserUpdate>) => updateUser(userUpdate),
    onSuccess: (user: UserGet) => {
      dispatch(setAuthorizedUser(user));
    },
  });
}

export default useUpdateUser;
