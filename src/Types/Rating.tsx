export interface Rating {
  room_id: string;
  starts: number;
  user_id: string;
}

export interface RatingCreateRequest {
  stars: number;
  recommended_for_friends: boolean;
  staff_rate: number;
  cleanliness_rate: number;
  stay_again: boolean;
  title?: string;
  experience_comment?: string;
  room_id: string;
}
