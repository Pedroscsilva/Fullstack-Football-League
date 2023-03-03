import ILeaderboard from './ILeaderboard';

export default interface IServiceLeaderboard {
  getLeaderboard(): Promise<ILeaderboard[]>;
}
