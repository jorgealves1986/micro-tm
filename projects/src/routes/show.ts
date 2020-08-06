import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import mongoose from 'mongoose';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  validateRequest
} from 'micro-task-manager-common';
import { Project } from '../models/project';

const router = express.Router();

router.get(
  '/api/projects/:projectId',
  requireAuth,
  [
    param('projectId')
      .notEmpty()
      .custom(
        (input: string) => String(mongoose.Types.ObjectId(input)) === input
      )
      .withMessage('Invalid projectId')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      throw new NotFoundError();
    }
    if (String(project.userId) !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(project);
  }
);

export { router as showProjectRouter };
