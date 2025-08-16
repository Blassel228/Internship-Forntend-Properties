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
  phone_number: string;
  name: string;
  surname: string;
  money_balance: number;
}
