interface ITeamForMatch {
  teamName: string;
};

export default interface IMatch {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam?: ITeamForMatch;
  awayTeam?: ITeamForMatch;
}