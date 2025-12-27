import app from '../src/app';
import http from 'http';
import { setupWebSocket } from '../src/websocket/collaboration.gateway';
import { setupWorker } from '../src/jobs/worker';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
    }).catch(err => console.error('MongoDB connection error:', err));
}

// Note: WebSockets and BullMQ Workers might not work as expected in Vercel Serverless Functions
// because they require a persistent process. However, we initialize them to maintain code parity.
const server = http.createServer(app);

try {
    setupWebSocket(server);
} catch (err) {
    console.warn('WS init failed');
}

try {
    setupWorker();
} catch (err) {
    console.warn('Worker init failed');
}

export default app;
