import { Response } from 'express';
import prisma from '../../config/prisma';
import { AuthRequest } from '../../core/interfaces/auth.interface';

export const createWorkspace = async (req: AuthRequest, res: Response) => {
    const { name, projectId } = req.body;

    try {
        const workspace = await prisma.workspace.create({
            data: {
                name,
                projectId,
            },
        });
        res.status(201).json(workspace);
    } catch (error) {
        res.status(500).json({ message: 'Error creating workspace', error });
    }
};

export const getProjectWorkspaces = async (req: AuthRequest, res: Response) => {
    const { projectId } = req.params;

    try {
        const workspaces = await prisma.workspace.findMany({ where: { projectId } });
        res.json(workspaces);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching workspaces', error });
    }
};
