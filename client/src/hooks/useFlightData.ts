import { useState, useCallback, useEffect } from "react";
import { flightDataService } from "@/services/flightDataService";
import { FlightData } from "@/types/types";

export const useFlightData = () => {
  const [data, setData] = useState<FlightData | undefined>({
    altitude: 0,
    hsi: 0,
    adi: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendFlightData = useCallback(async (payload: Omit<FlightData, "_id" | "createdAt" | "updatedAt">) => {
    setLoading(true);
    setError(null);
    try {
      const result = await flightDataService.sendFlightData(payload);
      setData(result?.data);
      console.info("State updated with new flight data");
    } catch (err: Error | unknown) {
      const messageErr = err instanceof Error ? err.message : 'Unknown error';
      setError(messageErr);
      console.error("sendFlightData hook error", messageErr);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const getFlightData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await flightDataService.getFlightData();
        setData(result?.data);
        console.info("Initial flight data loaded");
      } catch (err: Error | unknown) {
        const messageErr = err instanceof Error ? err.message : 'Unknown error';
        setError(messageErr);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    getFlightData();
  }, []);

  return { data, loading, error, sendFlightData };
};