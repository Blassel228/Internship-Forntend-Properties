import {GuestCreateIn} from "./Guest.tsx";

export interface CreateCheckoutSessionRequest {
  room_id: string;
  price: number;
  start_date: string;
  end_date: string;
  currency?: string;
  special_requests?: string | null;
  guest_data: GuestCreateIn;
}

export interface CreateRefundRequest{
  booking_id: string;
  refund_reason: string;
}