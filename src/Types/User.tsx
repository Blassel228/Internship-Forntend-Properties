export interface UserCreate {
  username: string;
  password: string;
  email: string;
  phone_number: string;
  name: string;
  surname: string;
  country: string;
  money_balance?: number;
}

export interface UserGet {
  username: string;
  email: string;
  name: string;
  surname: string;
  phone_number: string;
  country: string;
  money_balance: number;
  sex: number;
  image_data: string;
  birthdate: string;
}

export interface UserUpdate {
  username: string;
  email: string;
  name: string;
  surname: string;
  phone_number: string;
  country: string;
  sex: number;
  birthdate: string;
}
