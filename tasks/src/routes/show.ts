import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import mongoose from 'mongoose';
import {
  requireAuth,
  NotFoundError,
  validateRequest
} from 'micro-task-manager-common';
import { Task } from '../models/task';

const router = express.Router();

router.get(
  '/api/tasks/show/:taskId',
  requireAuth,
  [
    param('taskId')
      .notEmpty()
      .custom(
        (input: string): boolean =>
          String(mongoose.Types.ObjectId(input)) === input
      )
      .withMessage('Invalid taskId')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      throw new NotFoundError();
    }

    res.send(task);
  }
);

export { router as showTaskRouter };
