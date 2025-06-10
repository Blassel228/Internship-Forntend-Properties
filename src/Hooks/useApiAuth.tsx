import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../Api/apiRoom.tsx";
import {loginGetToken} from "../Api/apiAuth.tsx";

export const useLogin = (username: string, password: string) => {
  return useQuery({
    queryKey: ["login"],
    queryFn: () => loginGetToken(username, password),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 60000,
  });
};
