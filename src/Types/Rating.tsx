export interface Rating {
  room_id: string;
  starts: number;
  user_id: string;
}

export interface RatingCreateRequest {
  room_id: string;
  starts: number;
}
