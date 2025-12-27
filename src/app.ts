import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import { apiLimiter } from './api/middlewares/rate-limit.middleware';
import { errorHandler } from './api/middlewares/error.middleware';
import dotenv from 'dotenv';
import authRoutes from './api/routes/auth.routes';
import projectRoutes from './api/routes/project.routes';
import workspaceRoutes from './api/routes/workspace.routes';
import jobRoutes from './api/routes/job.routes';

dotenv.config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/', apiLimiter);

// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/jobs', jobRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Error Handling
app.use(errorHandler);

export default app;
