import { Request, Response } from 'express';
import IServiceUser from '../interfaces/IServiceUser';
import ErrorWithStatus from '../utils/ErrorWithStatus';
import { decodeToken } from '../utils/JWT';

export default class UserController {
  private _service: IServiceUser;

  constructor(service: IServiceUser) {
    this._service = service;
  }

  async authenticateUser(req: Request, res: Response) {
    try {
      const userToken = await this._service.authenticateUser(req.body);
      return res.status(200).json(userToken);
    } catch (error) {
      if (error instanceof ErrorWithStatus) {
        return res.status(error.statusCode).json({ message: error.message });
      }
    }
  }

  static async getUserRole(req: Request, res: Response) {
    const userRole = await decodeToken(req.headers.authorization);
    return res.status(200).json({ role: userRole.role });
  }
}
