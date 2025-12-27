import { Router } from 'express';
import { createWorkspace, getProjectWorkspaces } from '../controllers/workspace.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware as any);

router.post('/', createWorkspace as any);
router.get('/:projectId', getProjectWorkspaces as any);

export default router;
