import { Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';
import ErrorWithStatus from '../utils/ErrorWithStatus';

export default class MatchController {
  private _service: IServiceMatch;
  private defaultErrorMessage = 'Unknown error';

  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async findAll(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      const result = await this._service.getAllMatches(inProgress as string | undefined);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: this.defaultErrorMessage });
    }
  }

  async finishMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      this._service.finishMatch(id);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return res.status(500).json({ message: this.defaultErrorMessage });
    }
  }

  async updateMatchResults(req: Request, res: Response) {
    try {
      const { id } = req.params;
      this._service.updateMatchResult(id, req.body);
      return res.status(200).json({ message: 'Successfully changed match results' });
    } catch (error) {
      if (error instanceof ErrorWithStatus) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: this.defaultErrorMessage });
    }
  }
}
