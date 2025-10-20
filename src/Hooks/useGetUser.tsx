import {useQuery} from "@tanstack/react-query";
import {getUser} from "../Api/apiUser.tsx";

const useGetUser = (userId) => {
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    staleTime: 1000 * 60 * 5,
  });
  return { user, isUserLoading, userError };
};

export default useGetUser;
