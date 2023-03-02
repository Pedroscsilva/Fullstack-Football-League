import { Request, Response } from 'express';
import IServiceTeam from '../interfaces/IServiceTeam';

export default class TeamController {
  private _service: IServiceTeam;

  constructor(service: IServiceTeam) {
    this._service = service;
  }

  async findAll(_req: Request, res: Response) {
    const result = await this._service.findAll();
    return res.status(200).json(result);
  }

  async findByPk(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this._service.findByPk(id);
    return res.status(200).json(team);
  }
}
