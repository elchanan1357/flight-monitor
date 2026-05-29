import { FlightDataType } from '@/types/flight-data.type';
import mongoose from 'mongoose';

const flightDataSchema = new mongoose.Schema<FlightDataType>({
    altitude: {
        type: Number,
        required: true,
        min: 0,
        max: 3000,
    },
    his: {
        type: Number,
        required: true,
        min: 0,
        max: 360
    },
    adi: {
        type: Number,
        required: true,
        min: -100,
        max: 100,
    },
}, {
    timestamps: true,
})

export const FlightData = mongoose.model<FlightDataType>('FlightData', flightDataSchema);