import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/teams.service';
import ErrorWithStatus from '../utils/ErrorWithStatus';

const teamService = new TeamService();

const newMatchCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      throw new ErrorWithStatus('It is not possible to create a match with two equal teams', 422);
    }

    const allTeams = await teamService.findAll();
    const allTeamsLength = allTeams.length;
    if (Number(homeTeamId) > allTeamsLength || Number(awayTeamId) > allTeamsLength) {
      throw new ErrorWithStatus('There is no team with such id!', 404);
    }

    next();
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Unknown error' });
  }
};

export default newMatchCheck;
