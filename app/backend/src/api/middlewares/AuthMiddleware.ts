import { NextFunction, Request, Response } from 'express';
import ErrorWithStatus from '../utils/ErrorWithStatus';
import { authenticateToken } from '../utils/JWT';

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    authenticateToken(token);
    next();
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }
};

export default authenticationMiddleware;
