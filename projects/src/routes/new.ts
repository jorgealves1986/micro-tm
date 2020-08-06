import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from 'micro-task-manager-common';
import { Project } from '../models/project';

const router = express.Router();

router.post(
  '/api/projects',
  requireAuth,
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('You must provide a name to the project')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const project = Project.build({
      userId: req.currentUser!.id,
      name
    });

    await project.save();

    res.status(201).send(project);
  }
);

export { router as newProjectRouter };
