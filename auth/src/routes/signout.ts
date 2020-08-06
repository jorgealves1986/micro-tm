import express, { Request, Response } from 'express';
import {
  currentUser,
  requireAuth,
  ForbiddenError
} from 'micro-task-manager-common';
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signout',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.currentUser!.id);

    if (!user) {
      throw new ForbiddenError();
    }

    user.set({ refreshToken: undefined });
    await user.save();

    res.send({});
  }
);

export { router as signoutRouter };
