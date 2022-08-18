import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

chai.use(chaiHttp);

import { Response } from 'superagent';
// let chai
import { 
  validLogin,
  validReturnUser,
  token,
 } from './mocks';

describe('Comportamento da rota de /login', () => {
  beforeEach(() => {
    sinon.stub(Users, 'findOne').resolves(validReturnUser as Users);
    sinon.stub(jwt, 'sign').resolves(token)
  });

  afterEach(sinon.restore);

  it('Shoul return status 200 if valid user', async () => {
    const response: Response = await chai.request(app)
      .post('/login').send(validLogin);

    chai.expect(response.status).to.equal(200);
  });

  it('Shoul return a token if valid user', async () => {
    const response: Response = await chai.request(app)
      .post('/login').send(validLogin);

    chai.expect(response.body.token).to.equal(token);
  });
 
})