import { IMatch, IUpdateMatchResults } from './IMatch';

export default interface IServiceMatch {
  getUnfilteredMatches(): Promise<IMatch[]>;
  getAllMatches(progress: string | undefined): Promise<IMatch[]>;
  getFilteredMatches(progress: string): Promise<IMatch[]>;
  finishMatch(id: string): void;
  updateMatchResult(id: string, newResults: IUpdateMatchResults): void;
}
