import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const signup = async () => {
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  };

  const accessToken = jwt.sign(payload, process.env.JWT_KEY!);

  return { user: payload, accessToken };
};
