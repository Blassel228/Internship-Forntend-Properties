export interface CreateCheckoutSessionRequest {
  room_id: string;
  price: number;
  start_date: string;
  end_date: string;
  currency?: string;
  special_requests?: string | null;
}

export interface CreateRefundRequestByUser {
  booking_id: string;
  refund_reason: string;
}

export interface CreateRefundRequestByAdmin {
  booking_id: string;
  refund_reason: string;
  amount: number;
}
