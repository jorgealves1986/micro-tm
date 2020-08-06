import express, { Request, Response } from 'express';
import { param, body } from 'express-validator';
import mongoose from 'mongoose';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  validateRequest
} from 'micro-task-manager-common';
import { Task } from '../models/task';

const router = express.Router();

router.put(
  '/api/tasks/:taskId',
  requireAuth,
  [
    param('taskId')
      .notEmpty()
      .custom(
        (input: string) => String(mongoose.Types.ObjectId(input)) === input
      )
      .withMessage('Invalid taskId'),
    body('projectId')
      .notEmpty()
      .custom(
        (input: string) => String(mongoose.Types.ObjectId(input)) === input
      )
      .withMessage('Invalid projectId'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('You must provide a description'),
    body('completed')
      .notEmpty()
      .isBoolean()
      .withMessage(
        'Completed field must be provided and must be of type Boolean'
      )
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { projectId, description, completed } = req.body;

    const task = await Task.findById(req.params.taskId);
    if (!task) {
      throw new NotFoundError();
    }

    task.set({
      projectId,
      description,
      completed
    });
    await task.save();

    res.send(task);
  }
);

export { router as updateTaskRouter };
