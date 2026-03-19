import { getUsers } from "../Api/apiUser.tsx";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const {
    data: users,
    isLoading: areUsersLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
  });

  return { users, areUsersLoading, error };
};

export default useUsers;
