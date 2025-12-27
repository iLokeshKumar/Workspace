import { Server as SocketServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { createAdapter } from '@socket.io/redis-adapter';
import { pubClient, subClient } from '../config/redis';
import { verifyAccessToken } from '../core/utils/jwt.util';

export const setupWebSocket = (server: HttpServer) => {
    const io = new SocketServer(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.adapter(createAdapter(pubClient, subClient));

    io.use((socket: Socket, next) => {
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
        if (!token) {
            return next(new Error('Authentication error: No token provided'));
        }

        try {
            const decoded = verifyAccessToken(token) as any;
            (socket as any).userId = decoded.userId;
            next();
        } catch (err) {
            next(new Error('Authentication error: Invalid token'));
        }
    });

    io.on('connection', (socket: Socket) => {
        const userId = (socket as any).userId;
        console.log(`User connected: ${userId} (${socket.id})`);

        socket.on('join-project', (projectId: string) => {
            socket.join(projectId);
            console.log(`User ${userId} joined project ${projectId}`);
            socket.to(projectId).emit('user-joined', { userId });
        });

        socket.on('file-change', ({ projectId, filePath, content }: any) => {
            // Mocked payload
            socket.to(projectId).emit('file-changed', { userId, filePath, content });
        });

        socket.on('cursor-update', ({ projectId, cursor }: any) => {
            socket.to(projectId).emit('cursor-updated', { userId, cursor });
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${userId}`);
        });
    });

    return io;
};
