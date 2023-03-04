import * as sinon from 'sinon';
import * as chai from 'chai';
import * as JWT from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { IUser } from '../api/interfaces/IUser';

import UserService from '../api/services/user.service';
import  * as JWTUtils from '../api/utils/JWT';

import { Response } from 'superagent';
import { usersObjects, tokenMock, invalidEmailOrPasswordMessage } from './mocks/users';

chai.use(chaiHttp);

const { expect } = chai;

describe('E2E Success Tests - Users', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves(usersObjects.admin.validAdmin as User);
    sinon
      .stub(JWT, 'sign')
      .resolves(tokenMock.token);
    sinon
      .stub(bcryptjs, 'compareSync')
      .resolves(true);
    sinon
      .stub(JWT, 'verify')
      .resolves();
    sinon
      .stub(JWT, 'decode')
      .resolves(usersObjects.admin.validAdmin)
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
    (JWT.sign as sinon.SinonStub).restore();
    (bcryptjs.compareSync as sinon.SinonStub).restore();
    (JWT.verify as sinon.SinonStub).restore();
    (JWT.decode as sinon.SinonStub).restore();
  });

  it('should return a sucessfull login', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({email: usersObjects.admin.validAdmin.email, password: usersObjects.admin.validAdmin.password});

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(tokenMock);
  });

  it('should return the user role', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', tokenMock.token);

      expect(chaiHttpResponse.body.role).to.be.deep.equal(usersObjects.admin.validAdmin.role);
      expect(chaiHttpResponse.status).to.be.equal(200);
  })
})

describe('E2E Unsuccessful Tests - Found Users', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves(usersObjects.admin.validAdmin as User);
    sinon
      .stub(JWT, 'verify')
      .throws();
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
    (JWT.verify as sinon.SinonStub).restore();
  });

  it('should return an unsucessfull login for missing fields', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: usersObjects.admin.validAdmin.password });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('should return an unsucessfull login for a small password', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: usersObjects.admin.validAdmin.email, password: '12' });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal(invalidEmailOrPasswordMessage);
  });

  it('should return an unsucessfull login for a wrong password', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: usersObjects.admin.invalidAdmin.email, password: usersObjects.admin.invalidAdmin.password });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal(invalidEmailOrPasswordMessage);
  });

  it('should fail for a missing token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role');

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' });
  });

  it('should fail for an invalid token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', 'noToken');

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token must be a valid token' });
  });
})

describe('E2E Unsuccessful Tests - Unfound Users', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves(undefined);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  });

  it('should return an unsucessfull login for a wrong password', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: usersObjects.admin.invalidAdmin.email, password: usersObjects.admin.invalidAdmin.password });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal(invalidEmailOrPasswordMessage);
  });

})