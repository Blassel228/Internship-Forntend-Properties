import RoomType from "../Enums/roomType.tsx";
import RoomArea from "../Enums/roomArea.tsx";

export interface Room {
  id: string;
  image: string;
  type: string;
  price: number;
  bedrooms: number;
  beds: number;
  bathes: number;
  area: string;
  floor: number;
  has_sauna: boolean;
  has_jacuzzi: boolean;
  description: string;
  total_space: number;
  capacity: number;
  average_rating: number;
}


export interface RoomUpdate{
    image?: string;
    price?: number;
    beds?: number
    type?: RoomType;
    capacity?: number;
}

export interface RoomCreate {
    type: RoomType;
    price: number;
    beds: number;
    bedrooms: number;
    bathes: number;
    floor: number;
    area: RoomArea;
    capacity: number;
    description: string;
    total_space: number;
    has_sauna: boolean;
    has_jacuzzi: boolean;
}

export interface RoomFilters{
  type: string;
  lowest_price: number;
  greatest_price: number;
  capacity: number;
  area: string;
  bedrooms: number;
  bathes: number;
}
