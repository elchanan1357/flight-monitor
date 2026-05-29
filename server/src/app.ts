import express from 'express'
import cors from 'cors';
import { closeConnectionDB, connectDB } from '@/config/db';
import { router } from '@/router/flight-monitor.router'
import { config } from '@/utils/config';
import { logger } from '@/utils/logger';

const main = async () => {
    try {
        const app = express();
        const port = config.port;

        app.use(cors());
        app.use(express.json());

        await connectDB();
        app.use('/api/flight-data', router);

        app.listen(port, () => {
            logger.info(`Server is running on port ${port}`);
        });
    }
    catch (error) {
        const messageErr = error instanceof Error ? error.message : 'Unknown error';
        logger.error(`Error starting server: ${messageErr}`);
        process.exit(1);
     }
}

const cleanup = async (exitCode: number) => {
    try {
        logger.info(`Shutting down server...`)
        await closeConnectionDB();
        process.exit(exitCode)
    }
    catch (error) {
        const messageErr = error instanceof Error ? error.message : 'Unknown error';
        logger.error(`Error during shutdown: ${messageErr}`);
    }
    finally {
        process.exit(exitCode)
    }
}

process.on('SIGINT', () => {
    cleanup(0);
});
process.on('SIGTERM', () => {
    cleanup(0);
});

main()
