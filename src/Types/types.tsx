export interface Property {
  id: string;
  imageUrl: string;
  type: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  floor: number;
  parkingSpots: number;
  totalSpace: string;
  contractStatus: string;
  paymentProcess: string;
  safetyFeature: string;
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

export interface BookingCreate{
  property_id: string;
  end_date: string;
  start_date: string;
}

export interface Booking{
  id: string;
  property_id: string;
  end_date: string;
  start_date: string;
  user_id: string;
  status: string;
  created_at: string;
}