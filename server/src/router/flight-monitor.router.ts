import express from 'express';
import { getFlightData, setFlightData } from '@/controller/flight-monitor.controller';
const router = express.Router();

router.get('/', getFlightData);
router.post('/', setFlightData);

export { router };
