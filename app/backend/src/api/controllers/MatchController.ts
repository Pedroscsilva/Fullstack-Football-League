import { Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';


export default class MatchController {
  private _service: IServiceMatch;

  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async findAll(_req: Request, res: Response) {
    const result = await this._service.getAllMatches();
    return res.status(200).json(result);
  }
}