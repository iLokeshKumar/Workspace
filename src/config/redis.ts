import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
    retryStrategy: (times: number) => {
        return Math.min(times * 50, 2000);
    },
};

export const redis = new Redis(redisConfig);
export const pubClient = new Redis(redisConfig);
export const subClient = new Redis(redisConfig);

const handleError = (clientName: string) => (err: any) => {
    console.error(`${clientName} connection failed. Features like real-time collaboration and background jobs will be disabled until Redis is available.`);
};

redis.on('error', handleError('Redis'));
pubClient.on('error', handleError('PubClient'));
subClient.on('error', handleError('SubClient'));

redis.on('connect', () => console.log('Redis connected successfully'));
subClient.on('connect', () => console.log('SubClient connected successfully'));
pubClient.on('connect', () => console.log('PubClient connected successfully'));
