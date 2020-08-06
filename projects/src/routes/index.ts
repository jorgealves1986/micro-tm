import express, { Request, Response } from 'express';
import { requireAuth } from 'micro-task-manager-common';
import { Project } from '../models/project';

const router = express.Router();

router.get(
  '/api/projects',
  requireAuth,
  async (req: Request, res: Response) => {
    const projects = await Project.find({
      userId: req.currentUser!.id
    });

    res.send(projects);
  }
);

export { router as indexProjectRouter };
