import baseApi from "./base.tsx";
import { Property } from "../Types/types.tsx";

export const getProperties = async (): Promise<Property[]> => {
  const { data }: { data: Property[] } =
    await baseApi.get<Property[]>(`/property`);
  return data;
};
