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
import { ProjectDeletedPublisher } from '../events/publishers/project-deleted-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete(
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

    // TODO: concurrency missing
    await Project.deleteOne({ _id: project.id });

    await new ProjectDeletedPublisher(natsWrapper.client).publish({
      id: project.id
    });

    res.status(204).send(project);
  }
);

export { router as deleteProjectRouter };
