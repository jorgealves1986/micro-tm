import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, NotAuthorizedError } from 'micro-task-manager-common';
import { User } from '../models/user';

interface UserPayload {
  id: string;
  email: string;
}

const router = express.Router();

router.post(
  '/api/users/token',
  [body('token').notEmpty().withMessage('You must supply a token')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token } = req.body;

    let user: UserPayload;
    try {
      user = jwt.verify(token, process.env.JWT_REFRESH_KEY!) as UserPayload;
    } catch (error) {
      throw new NotAuthorizedError();
    }

    const currentUser = await User.findOne({
      _id: user.id,
      refreshToken: token
    });
    if (!currentUser) {
      throw new NotAuthorizedError();
    }

    const accessToken = jwt.sign(
      {
        id: currentUser.id,
        email: currentUser.email
      },
      process.env.JWT_KEY!,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );

    res.send({ accessToken });
  }
);

export { router as tokenRouter };
