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
