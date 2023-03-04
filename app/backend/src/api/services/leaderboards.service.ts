import { ModelStatic } from 'sequelize';
import { firstBy } from 'thenby';
import Match from '../../database/models/Match';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';
import ILeaderboard from '../interfaces/ILeaderboard';
import ITeam from '../interfaces/ITeam';
import Team from '../../database/models/Team';
import { IMatch } from '../interfaces/IMatch';

export default class LeaderboardService implements IServiceLeaderboard {
  protected matchModel: ModelStatic<Match> = Match;
  protected teamModel: ModelStatic<Team> = Team;

  private async getTeams(): Promise<ITeam[]> {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }

  private async getPlayedMatches(): Promise<IMatch[]> {
    const allMatches = await this.matchModel.findAll({ where: { inProgress: false } });
    return allMatches;
  }

  static createLeaderboardArchiteture(teams: ITeam[]): ILeaderboard[] {
    const allTeams = teams.map((team) => ({
      name: team.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '00.00',
    }));
    return allTeams;
  }

  static calculateMatchStats(
    teamStats: ILeaderboard,
    matchStats: IMatch,
    selfType: 'home' | 'away',
    rivalType: 'home' | 'away',
  ) {
    const changedTeamStats = teamStats;
    const balance = matchStats[`${selfType}TeamGoals`] - matchStats[`${rivalType}TeamGoals`];
    changedTeamStats.totalGames += 1;
    changedTeamStats.goalsFavor += matchStats[`${selfType}TeamGoals`];
    changedTeamStats.goalsOwn += matchStats[`${rivalType}TeamGoals`];
    changedTeamStats.goalsBalance += balance;
    const newTeamStats = LeaderboardService.calculateWinnerAndEfficency(changedTeamStats, balance);
    return newTeamStats;
  }

  static calculateWinnerAndEfficency(teamStats: ILeaderboard, goalsBalance: number) {
    const changedTeamStats = teamStats;
    if (goalsBalance > 0) {
      changedTeamStats.totalVictories += 1;
      changedTeamStats.totalPoints += 3;
    }
    if (goalsBalance < 0) {
      changedTeamStats.totalLosses += 1;
    }
    if (goalsBalance === 0) {
      changedTeamStats.totalDraws += 1;
      changedTeamStats.totalPoints += 1;
    }
    changedTeamStats.efficiency = (
      (changedTeamStats.totalPoints / (changedTeamStats.totalGames * 3))
      * 100
    ).toFixed(2);
    return changedTeamStats;
  }

  static evaluateMatches(currentLeaderboard: ILeaderboard[], playedMatches: IMatch[]) {
    const changedLeadearboard = currentLeaderboard;
    playedMatches.forEach((match) => {
      const homeTeamArrayIndex = match.homeTeamId - 1;
      const awayTeamArrayIndex = match.awayTeamId - 1;

      const initialHomeTeamStats = changedLeadearboard[homeTeamArrayIndex];
      const initialAwayTeamStats = changedLeadearboard[awayTeamArrayIndex];

      const newHomeTeamStats = LeaderboardService
        .calculateMatchStats(initialHomeTeamStats, match, 'home', 'away');
      const newAwayTeamStats = LeaderboardService
        .calculateMatchStats(initialAwayTeamStats, match, 'away', 'home');

      changedLeadearboard[homeTeamArrayIndex] = newHomeTeamStats;
      changedLeadearboard[awayTeamArrayIndex] = newAwayTeamStats;
    });
    return changedLeadearboard;
  }

  static evaluateHomeOrAwayMatches(
    currentLeaderboard: ILeaderboard[],
    playedMatches: IMatch[],
    type: 'home' | 'away',
  ) {
    const changedLeadearboard = currentLeaderboard;
    const otherType = type === 'home' ? 'away' : 'home';
    playedMatches.forEach((match) => {
      const arrayIndex = match[`${type}TeamId`] - 1;

      const initialStats = changedLeadearboard[arrayIndex];

      const newStats = LeaderboardService
        .calculateMatchStats(initialStats, match, type, otherType);

      changedLeadearboard[arrayIndex] = newStats;
    });

    return changedLeadearboard;
  }

  async getLeaderboard(type: undefined | 'home' | 'away'): Promise<ILeaderboard[]> {
    let evaluateMatches;
    const teams = await this.getTeams();
    const leaderboardArchiteture = LeaderboardService.createLeaderboardArchiteture(teams);
    const matches = await this.getPlayedMatches();
    if (!type) {
      evaluateMatches = LeaderboardService.evaluateMatches(leaderboardArchiteture, matches);
    } else {
      evaluateMatches = LeaderboardService
        .evaluateHomeOrAwayMatches(leaderboardArchiteture, matches, type);
    }
    const sortedArray = evaluateMatches.sort(
      firstBy((a: ILeaderboard, b: ILeaderboard) => b.totalPoints - a.totalPoints)
        .thenBy((a: ILeaderboard, b: ILeaderboard) => b.totalVictories - a.totalVictories)
        .thenBy((a: ILeaderboard, b: ILeaderboard) => b.goalsBalance - a.goalsBalance)
        .thenBy((a: ILeaderboard, b: ILeaderboard) => b.goalsFavor - a.goalsFavor)
        .thenBy((a: ILeaderboard, b: ILeaderboard) => a.goalsOwn - b.goalsOwn),
    );
    return sortedArray;
  }
}
