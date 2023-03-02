import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import { ILogin } from '../interfaces/IUser';
// import ErrorWithStatus from './ErrorWithStatus';

const TOKEN_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const generateToken = (payload: ILogin) =>
  sign(payload, TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

// const authenticateToken = (token: string) => {
//   if (!token) {
//     const error = new Error('Token not found');
//     error.status = 401;
//   }

//   try {
//     const verificationResponse = verify(token, TOKEN_SECRET);
//     return verificationResponse;
//   } catch (err) {
//     const error = new Error('Expired or invalid token');
//     error.status = 401;
//     throw error;
//   }
// };

// const decodeToken = (token: string) => {
//   const payload = decode(token);
//   return payload;
// };

export default generateToken;
