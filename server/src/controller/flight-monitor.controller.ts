import { FlightData } from '@/model/flight-data.model';
import { Response, Request } from 'express';
import { logger } from '@/utils/logger';
import { FlightDataType } from '@/types/types';

export const setFlightData = async (req: Request, res: Response) => {
    try {
        const { altitude, hsi, adi } = req.body;
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