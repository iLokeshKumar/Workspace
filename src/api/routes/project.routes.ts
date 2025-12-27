import { Router } from 'express';
import { createProject, getProjects, inviteCollaborator } from '../controllers/project.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware as any);

router.post('/', createProject as any);
router.get('/', getProjects as any);
router.post('/:projectId/invite', inviteCollaborator as any);

export default router;
