export interface ImageGet {
  id: string;
  created_at: string;
  image_data: string;
  file_name: string;
}

export interface ImageUpdate{
  image_data: string;
}