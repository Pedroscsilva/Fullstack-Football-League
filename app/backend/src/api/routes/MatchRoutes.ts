import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchController';
import authenticationMiddleware from '../middlewares/AuthMiddleware';
import newMatchCheck from '../middlewares/MatchMiddleware';
import MatchService from '../services/MatchService';

const matchRoutes = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRoutes.get('/matches?', (req: Request, res: Response) => matchController.findAll(req, res));
matchRoutes.patch(
  '/matches/:id/finish',
  authenticationMiddleware,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);
matchRoutes.patch(
  '/matches/:id',
  authenticationMiddleware,
  (req: Request, res: Response) => matchController.updateMatchResults(req, res),
);
matchRoutes.post(
  '/matches',
  authenticationMiddleware,
  newMatchCheck,
  (req: Request, res: Response) => matchController.createNewMatch(req, res),
);

export default matchRoutes;
