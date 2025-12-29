import http from 'http';
import app from './app';
import { setupWebSocket } from './websocket/collaboration.gateway';
import { setupWorker } from './jobs/worker';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import prisma from './config/prisma';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Test PostgreSQL Connection
prisma.$connect()
    .then(() => console.log('Connected to PostgreSQL (Neon.tech) successfully'))
    .catch((err) => console.error('Failed to connect to PostgreSQL:', err));

const server = http.createServer(app);

// Initialize WebSocket (Optional for dev if Redis is missing)
try {
    setupWebSocket(server);
} catch (err) {
    console.warn('Could not initialize WebSockets. Real-time features will be disabled.');
}

// Initialize Background Worker (Optional for dev if Redis is missing)
try {
    setupWorker();
} catch (err) {
    console.warn('Could not initialize BullMQ Worker. Background jobs will be disabled.');
}

// Connect to MongoDB (Optional for dev)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/collaborative_workspace';
mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s
})
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        console.warn('Activity logging will be disabled.');
    });

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
