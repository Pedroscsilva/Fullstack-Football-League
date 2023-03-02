import { sign, verify, decode, JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import { IUser } from '../interfaces/IUser';
import ErrorWithStatus from './ErrorWithStatus';

const TOKEN_SECRET = process.env.JWT_SECRET || 'jwt_secret';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    role: string;
  }
}

export const generateToken = (payload: IUser) =>
  sign(payload, TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

export const authenticateToken = (token: string | undefined) => {
  if (!token) { throw new ErrorWithStatus('Token not found', 401); }

  try {
    const verificationResponse = verify(token, TOKEN_SECRET);
    return verificationResponse;
  } catch (err) {
    throw new ErrorWithStatus('Token must be a valid token', 401);
  }
};

export const decodeToken = (token: string | undefined): JwtPayload => {
  if (!token) { throw new ErrorWithStatus('Token not found', 401); }

  const payload = decode(token) as JwtPayload;
  return payload;
};
