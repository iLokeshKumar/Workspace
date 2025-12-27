import { Response } from 'express';
import prisma from '../../config/prisma';
import { AuthRequest } from '../../core/interfaces/auth.interface';

export const createProject = async (req: AuthRequest, res: Response) => {
    const { name, description } = req.body;
    const userId = req.user?.userId;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const project = await prisma.project.create({
            data: {
                name,
                description,
                ownerId: userId,
            },
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error });
    }
};

export const getProjects = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const ownedProjects = await prisma.project.findMany({ where: { ownerId: userId } });
        const collabProjects = await prisma.collaboration.findMany({
            where: { userId },
            include: { project: true },
        });

        const allProjects = [
            ...ownedProjects,
            ...collabProjects.map((c: any) => c.project),
        ];

        res.json(allProjects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error });
    }
};

export const inviteCollaborator = async (req: AuthRequest, res: Response) => {
    const { projectId } = req.params;
    const { email, role } = req.body;

    try {
        const userToInvite = await prisma.user.findUnique({ where: { email } });
        if (!userToInvite) return res.status(404).json({ message: 'User not found' });

        const collaboration = await prisma.collaboration.create({
            data: {
                userId: userToInvite.id,
                projectId,
                role: role || 'VIEWER',
            },
        });

        res.status(201).json(collaboration);
    } catch (error) {
        res.status(500).json({ message: 'Error inviting collaborator', error });
    }
};
