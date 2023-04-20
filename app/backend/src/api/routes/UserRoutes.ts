import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import authenticationMiddleware from '../middlewares/AuthMiddleware';
import UserService from '../services/UserService';

const userRoutes = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRoutes.post(
  '/login',
  (req: Request, res: Response) => userController.authenticateUser(req, res),
);

userRoutes.get(
  '/login/role',
  authenticationMiddleware,
  (req: Request, res: Response) => UserController.getUserRole(req, res),
);

export default userRoutes;
