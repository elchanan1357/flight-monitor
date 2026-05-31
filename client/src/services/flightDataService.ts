import axios from "axios";
import { FlightData, ApiResponse } from "@/types/types";

const BASE_URL = "http://localhost:3000/api/flight-data";

export const flightDataService = {
  getFlightData: async (): Promise<ApiResponse> => {
    console.info("Fetching flight data");
    const { data } = await axios.get<ApiResponse>(BASE_URL);
    console.info("Flight data fetched successfully");
    return data;
  },

  sendFlightData: async (payload: Omit<FlightData, "_id" | "createdAt" | "updatedAt">): Promise<ApiResponse> => {
    console.info("Sending flight data", payload);
    const { data } = await axios.post<ApiResponse>(BASE_URL, payload);
    console.info("Flight data sent successfully");
    return data;
  },
};
