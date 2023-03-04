import ILeaderboard from './ILeaderboard';

export default interface IServiceLeaderboard {
  getLeaderboard(type: undefined | 'home' | 'away'): Promise<ILeaderboard[]>;
}
