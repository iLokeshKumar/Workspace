import { Router } from 'express';
import { submitJob, getJobStatus } from '../controllers/job.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware as any);

router.post('/', submitJob as any);
router.get('/:jobId', getJobStatus as any);

export default router;
