import { FlightData } from '@/model/flight-data.model';
import { Response, Request } from 'express';
import { logger } from '@/utils/logger';
import { FlightDataType } from '@/types/types';

interface FlightDataResponse {
    success: boolean;
    message?: string;
}

const checkFlightData = (altitude: number, hsi: number, adi: number): FlightDataResponse => {
    if (altitude > 3000 || altitude < 0)
        return { success: false, message: 'Altitude must be between 0 and 3000' };

    if (hsi > 360 || hsi < 0)
        return { success: false, message: 'HSI must be between 0 and 360' };

    if (adi > 100 || adi < -100)
        return { success: false, message: 'ADI must be between -100 and 100' };

    return { success: true };
}

export const setFlightData = async (req: Request, res: Response) => {
    try {
        const { altitude, hsi, adi } = req.body;
        const check: FlightDataResponse = checkFlightData(altitude, hsi, adi);
        if (!check?.success){
            logger.warn(`Invalid flight data: ${check.message}`);
             return res.status(400).json(check);
        } 

        await FlightData.deleteMany({});

        const flightData: FlightDataType | null = await FlightData.create({ altitude, hsi, adi });
        logger.info(`set flight data successfully`);
        res.status(200).json({ success: true, data: flightData });
    } catch (error) {
        const messageErr = error instanceof Error ? error.message : 'Unknown error';
        logger.error(`Failed to set flight data: ${messageErr}`);
        res.status(400).json({ success: false, message: 'Failed to set flight data', error: messageErr });
    }
}

export const getFlightData = async (req: Request, res: Response) => {
    try {
        const flightData: FlightDataType | null = await FlightData.findOne();
        logger.info(`get flight data successfully`);
        res.status(200).json({ success: true, data: flightData });
    }
    catch (error) {
        const messageErr = error instanceof Error ? error.message : 'Unknown error';
        logger.error(`Failed to get flight data: ${messageErr}`);
        res.status(400).json({ success: false, message: 'Failed to get flight data', error: messageErr });
    }
} 