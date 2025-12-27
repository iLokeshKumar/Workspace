import { Queue, Worker, Job } from 'bullmq';
import { redis } from './redis';
import dotenv from 'dotenv';

dotenv.config();

const queueName = process.env.JOB_QUEUE_NAME || 'collaborative-jobs';

export const jobQueue = new Queue(queueName, {
    connection: redis,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000,
        },
        removeOnComplete: true,
        removeOnFail: false,
    },
});

console.log(`Job Queue "${queueName}" initialized`);
