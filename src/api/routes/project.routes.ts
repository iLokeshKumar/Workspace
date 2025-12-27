import { Router } from 'express';
import { createProject, getProjects, inviteCollaborator } from '../controllers/project.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createProject);
router.get('/', getProjects);
router.post('/:projectId/invite', inviteCollaborator);

export default router;
