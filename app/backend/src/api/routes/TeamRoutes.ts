import { Router, Request, Response } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/teams.service';

const teamRoutes = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRoutes.get('/teams', (req: Request, res: Response) => teamController.findAll(req, res));
teamRoutes.get('/teams/:id', (req: Request, res: Response) => teamController.findByPk(req, res));

export default teamRoutes;
