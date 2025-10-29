import { ImageGet } from "./Image.tsx";

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  surname: string;
  phone_number: string;
  country?: string;
  is_admin: boolean;
  sex?: number;
  image_data?: string;
  birthdate?: string;
  image: ImageGet;
}

export interface UserCreate {
  username: string;
  password: string;
  email: string;
  phone_number: string;
  name: string;
  surname: string;
}

export interface UserUpdate {
  username: string;
  email: string;
  name: string;
  surname: string;
  is_admin: boolean;
  phone_number: string;
  image_data: string;
  country: string;
  sex: number;
  birthdate: string;
}
