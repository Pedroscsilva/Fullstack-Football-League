import ITeam from './ITeam';

export default interface IServiceTeam {
  findAll(): Promise<Array<ITeam>>
}
