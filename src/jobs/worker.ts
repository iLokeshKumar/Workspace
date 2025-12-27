import { Worker, Job } from 'bullmq';
import { redis } from '../config/redis';
import dotenv from 'dotenv';

dotenv.config();

const queueName = process.env.JOB_QUEUE_NAME || 'collaborative-jobs';

export const setupWorker = () => {
    const worker = new Worker(
        queueName,
        async (job: Job) => {
            console.log(`Processing job ${job.id}: ${job.name}`);

            // Simulate code execution or background task
            await new Promise((resolve) => setTimeout(resolve, 2000));

            console.log(`Job ${job.id} completed`);
            return { status: 'success', result: 'Task finished successfully' };
        },
        { connection: redis }
    );

    worker.on('completed', (job) => {
        console.log(`Job ${job.id} has completed!`);
    });

    worker.on('failed', (job, err) => {
        console.log(`Job ${job?.id} has failed with ${err.message}`);
    });

    return worker;
};
