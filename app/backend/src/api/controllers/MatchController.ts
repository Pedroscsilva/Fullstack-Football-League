import { Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';

export default class MatchController {
  private _service: IServiceMatch;

  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async findAll(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      const result = await this._service.getAllMatches(inProgress as string | undefined);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Unknown error' });
    }
  }

  async finishMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      this._service.finishMatch(id);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return res.status(500).json({ message: 'Unknown error' });
    }
  }
}
