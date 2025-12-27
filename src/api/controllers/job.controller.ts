import { Response } from 'express';
import { jobQueue } from '../../config/queue';
import { AuthRequest } from '../../core/interfaces/auth.interface';

export const submitJob = async (req: AuthRequest, res: Response) => {
    const { name, data } = req.body;
    const userId = req.user?.userId;

    try {
        const job = await jobQueue.add(name, { ...data, userId });
        res.status(202).json({ jobId: job.id, status: 'Queued' });
    } catch (error) {
        res.status(500).json({ message: 'Error queuing job', error });
    }
};

export const getJobStatus = async (req: AuthRequest, res: Response) => {
    const { jobId } = req.params;

    try {
        const job = await jobQueue.getJob(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        const state = await job.getState();
        res.json({ jobId: job.id, state, result: job.returnvalue });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job status', error });
    }
};
