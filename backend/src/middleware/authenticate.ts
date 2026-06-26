import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/errors';
import jwt from 'jsonwebtoken';

export type JwtPayload = {
  userId: string;
};

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const autHeader = req.get('authorization');
  if (!autHeader) throw new AppError('NOT_AUTHENTICATED', 401);

  const token = autHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.userId = decoded.userId;
  } catch (err) {
    throw new AppError('NOT_AUTHENTICATED', 401);
  }

  next();
};
