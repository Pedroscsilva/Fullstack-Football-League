import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

import { Response } from 'superagent';
import { fullTeams } from './mocks/teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('E2E Tests - Teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, 'findAll')
      .resolves(fullTeams as Team[]);
    sinon
      .stub(Team, 'findByPk')
      .resolves(fullTeams[0] as Team);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  });

  it('should return the db for teams', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(fullTeams);
  });

  it('should return one single team', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(fullTeams[0]);
  })
})