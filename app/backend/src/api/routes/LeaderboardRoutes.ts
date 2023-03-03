import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/leaderboards.service';

const leaderboardRoutes = Router();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRoutes.get(
  '/leaderboard',
  (req: Request, res: Response) => leaderboardController.getLeaderboard(req, res),
);

export default leaderboardRoutes;
