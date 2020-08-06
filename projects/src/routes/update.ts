import express, { Request, Response } from 'express';
import { param, body } from 'express-validator';
import mongoose from 'mongoose';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  validateRequest
} from 'micro-task-manager-common';
import { Project } from '../models/project';

const router = express.Router();

router.put(
  '/api/projects/:projectId',
  requireAuth,
  [
    param('projectId')
      .notEmpty()
      .custom(
        (input: string) => String(mongoose.Types.ObjectId(input)) === input
      )
      .withMessage('Invalid projectId'),
    body('name')
      .trim()
      .notEmpty()
      .withMessage('You must provide a project name')
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

    project.set({
      name: req.body.name
    });
    await project.save();

    res.send(project);
  }
);

export { router as updateProjectRouter };
