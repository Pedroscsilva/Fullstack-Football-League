import { Optional } from 'sequelize';

interface ITeamForMatch {
  teamName: string;
}

export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
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

export interface ICreateMatchBody {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IInsertedMatch {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  inProgress: boolean;
}

export type IRecieveObject = Optional<ICreateMatchBody, 'awayTeamGoals' | 'homeTeamGoals'>;
