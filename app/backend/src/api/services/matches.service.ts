import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team';
import Match from '../../database/models/Match';
import { IMatch, IUpdateMatchResults } from '../interfaces/IMatch';
import IServiceMatch from '../interfaces/IServiceMatch';
import ErrorWithStatus from '../utils/ErrorWithStatus';

export default class MatchService implements IServiceMatch {
  protected model: ModelStatic<Match> = Match;

  getUnfilteredMatches(): Promise<IMatch[]> {
    return this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
  }

  getFilteredMatches(progress: string): Promise<IMatch[]> {
    return this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: JSON.parse(progress) },
    });
  }

  getAllMatches(progress: string | undefined): Promise<IMatch[]> {
    if (!progress) return this.getUnfilteredMatches();
    return this.getFilteredMatches(progress);
  }

  finishMatch(id: string): void {
    this.model.update({ inProgress: false }, {
      where: { id },
    });
  }

  updateMatchResult(id: string, { homeTeamGoals, awayTeamGoals }: IUpdateMatchResults): void {
    if (!homeTeamGoals || !awayTeamGoals) { throw new ErrorWithStatus('Missing fields', 400); }
    this.model.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });
  }
}
