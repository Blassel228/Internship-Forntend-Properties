export interface Room {
  id: string;
  image: string;
  type: string;
  price: number;
  bedrooms: number;
  beds: number;
  bathes: number;
  area: string;
  floor: number;
  hasSauna: boolean;
  hasJacuzzi: boolean;
  description: string;
  totalSpace: number;
  capacity: number;
}

export interface UserCreate {
  username: string;
  password: string;
  email: string;
  phone_number: string;
  name: string;
  surname: string;
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

export interface Token {
  access_token: string;
  token_type: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface BookingCreate{
  room_id: string;
  end_date: string;
  start_date: string;
}

export interface Booking{
  id: string;
  room_id: string;
  end_date: string;
  start_date: string;
  user_id: string;
  status: string;
  created_at: string;
}