import { Router } from 'express';
import { createWorkspace, getProjectWorkspaces } from '../controllers/workspace.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createWorkspace);
router.get('/:projectId', getProjectWorkspaces);

export default router;
