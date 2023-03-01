import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team';
import IServiceTeam from '../interfaces/IServiceTeam';
import ITeam from '../interfaces/ITeam';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<Team> = Team;

  findAll(): Promise<ITeam[]> {
    return this.model.findAll();
  }
}
