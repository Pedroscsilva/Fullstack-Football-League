import IMatch from "./IMatch";

export default interface IServiceMatch {
  getAllMatches(): Promise<any>;
}