import { Room } from "./Room.tsx";
import BookingStatus from "../Enums/bookingStatus.tsx";

export interface Booking {
  id: string;
  user_id: string;
  room_id: string;
  status: string;
  price: number;
  specialRequests: string;
  end_date: string;
  start_date: string;
  created_at: string;
  room: Room;
}

export interface UpdateBooking {
  user_id: string;
  room_id: string;
  price: number;
  status: BookingStatus;
  start_date: Date;
  end_date: Date;
}
