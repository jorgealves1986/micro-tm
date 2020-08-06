import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { requireAuth, validateRequest } from 'micro-task-manager-common';
import { Task } from '../models/task';

const router = express.Router();

router.post(
  '/api/tasks',
  requireAuth,
  [
    body('projectId')
      .notEmpty()
      .custom(
        (input: string): boolean =>
          String(mongoose.Types.ObjectId(input)) === input
      )
      .withMessage('Invalid projectId'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('A description must be provived')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { projectId, description } = req.body;

    const task = Task.build({
      projectId,
      description,
      completed: req.body.completed || false
    });

    await task.save();

    res.status(201).send(task);
  }
);

export { router as newTaskRouter };
