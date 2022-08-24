import * as sinon from 'sinon';
import * as chai from 'chai';
import { Response } from 'superagent';

import Teams from '../database/models/Teams';
import { app } from '../app';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

import { allTeams } from './mocks';
import { ITeams } from '../interface/ITeams'

describe('Behavior of the /teams route', () => {
  afterEach(sinon.restore);

  it('Should return all teams in database when access /teams route', async () => {
    sinon.stub(Teams, 'findAll').resolves(allTeams as Teams[]);

    const response: Response = await chai.request(app)
      .get('/teams');

    const body = response.body;
    chai.expect(body).to.deep.equal(allTeams);
  });

  it('Shoul return a team according to its id on /teams/:id', async () => {
    const team = allTeams[0];
    sinon.stub(Teams, 'findOne').resolves(team as Teams);

    const response: Response = await chai.request(app)
      .get('/teams/1');

    const body = response.body;
    chai.expect(body).to.deep.equal(allTeams[0]);
  });

  it('Shoul return {} if not find team according to its id on /teams/:id', async () => {
    sinon.stub(Teams, 'findOne').resolves({} as Teams);

    const response: Response = await chai.request(app)
      .get('/teams/19');

    const body = response.body;
    chai.expect(body).to.deep.equal({});
  });
});