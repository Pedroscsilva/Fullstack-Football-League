import { Request, Response } from 'express';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

export default class LeaderboardController {
  private _service: IServiceLeaderboard;

  constructor(service: IServiceLeaderboard) {
    this._service = service;
  }

  async getLeaderboard(_req: Request, res: Response) {
    const result = await this._service.getLeaderboard();
    return res.status(200).json(result);
  }
}
