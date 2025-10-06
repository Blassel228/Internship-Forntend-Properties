export interface User {
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
}

export interface UserCreate {
  username: string;
  password: string;
  email: string;
  phone_number: string;
  name: string;
  surname: string;
  country?: string;
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
