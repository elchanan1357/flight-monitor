import mongoose from 'mongoose';
import { config } from '@/utils/config';
import { logger } from '@/utils/logger';

export const connectDB = async () => {
    try {
        const mongooseConnection = await mongoose.connect(config.mongo_uri);
        logger.info(`MongoDB connected successfully by host: ${mongooseConnection.connection.host}`);
    } catch (error) {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
