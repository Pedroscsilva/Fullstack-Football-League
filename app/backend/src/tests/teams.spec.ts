import Sinon from 'sinon';
import { Model } from 'sequelize';
import teamsMock from './mocks/teams';
import Team from '../database/models/Team';
import TeamService from '../api/services/teams.service';

describe('Service Tests - Teams', function() {
  afterEach(function() {
    Sinon.restore();
  });

  it('should return the db teams', async function() {
    const outputMock: Team = new Team({teamsMock});

    Sinon.stub(Model, 'findAll').resolves([outputMock]);
    const service = new TeamService();
    const result = await service.findAll();

    expect(result).to.be.equal(outputMock);
  })
})