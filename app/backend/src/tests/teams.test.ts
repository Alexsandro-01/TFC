import * as sinon from 'sinon';
import * as chai from 'chai';
import { Response } from 'superagent';

import Teams from '../database/models/Teams';
import { app } from '../app';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

import { allTeams } from './mocks';

describe('Behavior of the /teams route', () => {
  beforeEach(() => {
    sinon.stub(Teams, 'findAll').resolves(allTeams as Teams[]);
  });

  afterEach(sinon.restore);

  it('Should return all teams in database when access /teams route', async () => {
    const response: Response = await chai.request(app)
      .get('/teams');

    const body = response.body;
    chai.expect(body).to.deep.equal(allTeams);
  })
});