import { Guest } from "./Guest.tsx";

export interface BookingCreateIn {
  room_id: string;
  price: number;
  special_requests: string;
  start_date: string;
  end_date: string;
}

export interface Booking {
  id: string;
  guest_id: string;
  user_id: string;
  room_id: string;
  status: string;
  specialRequests: string;
  end_date: string;
  start_date: string;
  created_at: string;
  guest: Guest;
}
