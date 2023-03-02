import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/user.service';

const userRoutes = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRoutes.post(
  '/login',
  (req: Request, res: Response) => userController.authenticateUser(req, res),
);

export default userRoutes;
