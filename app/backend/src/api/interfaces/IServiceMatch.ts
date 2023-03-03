import IMatch from './IMatch';

export default interface IServiceMatch {
  getAllMatches(progress: string | undefined): Promise<IMatch[]>;
  getFilteredMatches(progress: string): Promise<IMatch[]>;
}
