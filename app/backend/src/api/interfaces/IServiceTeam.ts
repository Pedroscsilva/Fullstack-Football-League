import ITeam from './ITeam';

export default interface IServiceTeam {
  findAll(): Promise<Array<ITeam>>;
  findByPk(pk: string): Promise<ITeam | null>
}
