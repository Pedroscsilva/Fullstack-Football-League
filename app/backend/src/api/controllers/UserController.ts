import { Request, Response } from 'express';
import IServiceUser from '../interfaces/IServiceUser';
import ErrorWithStatus from '../utils/ErrorWithStatus';

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
      console.log(error);
    }
  }
}
