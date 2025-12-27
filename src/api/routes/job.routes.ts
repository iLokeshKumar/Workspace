import { Router } from 'express';
import { submitJob, getJobStatus } from '../controllers/job.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', submitJob);
router.get('/:jobId', getJobStatus);

export default router;
