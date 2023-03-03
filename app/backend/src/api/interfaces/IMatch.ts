interface ITeamForMatch {
  teamName: string;
}

export interface IMatch {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam?: ITeamForMatch;
  awayTeam?: ITeamForMatch;
}

export interface IUpdateMatchResults {
  homeTeamGoals: number;
  awayTeamGoals: number;
}
