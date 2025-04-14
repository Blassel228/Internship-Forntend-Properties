import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../Api/property.tsx";

export const usePropertiesQuery = () => {
  return useQuery({
    queryKey: ["gifts"],
    queryFn: () => getProperties(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 60000,
  });
};
