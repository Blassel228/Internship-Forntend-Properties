import { Guest } from "./Guest.tsx";
import { Room } from "./Room.tsx";

export interface Booking {
  id: string;
  guest_id: string;
  user_id: string;
  room_id: string;
  status: string;
  price: number;
  specialRequests: string;
  end_date: string;
  start_date: string;
  created_at: string;
  guest: Guest;
  room: Room;
}
