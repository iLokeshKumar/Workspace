# Real-Time Collaborative Workspace Backend

A production-grade backend for a real-time collaborative workspace, built with Express.js, TypeScript, PostgreSQL, MongoDB, Redis, and Socket.io.

## Features

- **Real-Time Collaboration**: Socket.io for live cursor updates and file change synchronization.
- **Scalable Architecture**: Redis Pub/Sub for horizontal scaling of WebSocket events.
- **Relational Data**: PostgreSQL with Prisma ORM for Users, Projects, and Workspaces.
- **Activity Logging**: MongoDB for high-volume activity trails.
- **Background Jobs**: BullMQ with Redis for asynchronous task processing.
- **Authentication**: JWT-based auth with Role-Based Access Control (RBAC).
- **API Documentation**: OpenAPI (Swagger) integrated at `/api-docs`.
- **Security**: Rate limiting, Helmet, CORS, and centralized error handling.

## Tech Stack

- **Framework**: Express.js (TypeScript)
- **Databases**: PostgreSQL, MongoDB, Redis
- **ORM**: Prisma
- **Real-time**: Socket.io (Redis Adapter)
- **Job Queue**: BullMQ
- **Auth**: JWT, bcryptjs, Passport

## Getting Started

### Prerequisites

- Node.js (v20+)
- Docker and Docker Compose

### Fast Track (Docker)

1. Clone the repository.
2. Run `docker-compose up -d` to start the infrastructure (PostgreSQL, MongoDB, Redis).
3. Create a `.env` file (see `.env.example`).
4. Run `npm install`.
5. Run `npm run prisma:generate`.
6. Run `npm run dev`.

### Scripts

- `npm run dev`: Start development server with nodemon.
- `npm run build`: Build for production.
- `npm run start`: Run production build.
- `npm run prisma:generate`: Generate Prisma client.
- `npm run prisma:migrate`: Run database migrations.
- `npm run test`: Run unit tests.

## API Documentation

The API documentation is available at `http://localhost:3004/api-docs` when the server is running.

## Architecture Highlights

- **ESM/CommonJS**: Configured for maximum compatibility.
- **Worker Process**: Background jobs run in a separate persistent process (standard practice for high-load apps).
- **Scalable Real-time**: The Redis adapter for Socket.io allows you to run multiple instances of the server behind a load balancer.

## License

MIT
