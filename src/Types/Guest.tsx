export interface GuestCreateIn {
  name: string;
  surname: string;
  email: string;
  phone: string;
  country?: string;
  whether_send_confirmation: boolean;
  is_booking_for_me: boolean;
}

export interface Guest {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  country?: string;
  whether_send_confirmation: boolean;
  is_booking_for_me: boolean;
  booking_id: number;
}
