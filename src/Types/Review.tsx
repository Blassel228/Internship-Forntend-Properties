export interface Review {
  id: string;
  staff_rate: number;
  cleaning_rate: number;
  title: string;
  recommended_for_friends: boolean;
  stay_again: boolean;
  experience_comment: string;
  stars: number;
  user_id: string;
  room_id: string;
  created_at: string;
}

export interface ReviewCreateRequest {
  stars: number;
  recommended_for_friends: boolean;
  staff_rate: number;
  cleanliness_rate: number;
  stay_again: boolean;
  title?: string;
  experience_comment?: string;
  room_id: string;
}
