import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import mongoose from 'mongoose';
import { requireAuth, validateRequest } from 'micro-task-manager-common';
import { Task } from '../models/task';

const router = express.Router();

router.get(
  '/api/tasks/:projectId',
  requireAuth,
  [
    param('projectId')
      .notEmpty()
      .custom(
        (input: string): boolean =>
          String(mongoose.Types.ObjectId(input)) === input
      )
      .withMessage('Invalid projectId')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const tasks = await Task.find({
      projectId: req.params.projectId
    });

    res.send(tasks);
  }
);

export { router as indexTaskRouter };
