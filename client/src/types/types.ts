export interface FlightData {
  _id?: string;
  altitude: number;
  hsi: number;
  adi: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse {
  success: boolean;
  data?: FlightData;
  message?: string;
  error?: string;
}
