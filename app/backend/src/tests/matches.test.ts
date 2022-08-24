import * as sinon from 'sinon';
import * as chai from 'chai';
import { Response }  from 'superagent';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import Matches from '../database/models/Matches';
import {
  matches,
  createMatch,
  resultCreateMatch,
  token,
  validReturnUser,
  createMatchSameTeamId,
  createMatchWithInvalidTeam,
  invalidToken,
  updateMatch
 } from './mocks';
import { app } from '../app';
import Teams from '../database/models/Teams';
import Users from '../database/models/Users';

chai.use(chaiHttp);

describe('Behavior of the /matches route', () => {
  afterEach(sinon.restore);

  it('Should return all matches', async () => {
    sinon.stub(Matches, 'findAll').resolves(matches as unknown as Matches[]);
    
    const response: Response = await chai.request(app)
      .get('/matches');

    const body = response.body;
    chai.expect(body).to.deep.equal(matches);
  });

  it('Should to create new match on data base', async () => {
    sinon.stub(Users, 'findOne').resolves(validReturnUser as Users); // to token resolve
    sinon.stub(Teams, 'findByPk').resolves({} as Teams);
    sinon.stub(Matches, 'create').resolves(resultCreateMatch as Matches);

    const response: Response = await chai.request(app)
      .post('/matches')
      .set({
        authorization: token
      })
      .send(createMatch);

    const body = response.body;
    chai.expect(body).to.deep.equal(resultCreateMatch);
  });

  it('Dont\'t should to create new match on data base with same team id', async () => {
    sinon.stub(Users, 'findOne').resolves(validReturnUser as Users); // to token resolve
    sinon.stub(Teams, 'findByPk').resolves();

    const response: Response = await chai.request(app)
      .post('/matches')
      .set({
        authorization: token
      })
      .send(createMatchSameTeamId);

    const body = response.body;
    chai.expect(body).to.deep.equal(
      { "message": "It is not possible to create a match with two equal teams" }
    );
  });

  it('Dont\'t should to create new match on data base with team that dont\'t exist', async () => {
    sinon.stub(Users, 'findOne').resolves(validReturnUser as Users); // to token resolve
    sinon.stub(Teams, 'findByPk').resolves(null as unknown as Teams);

    const response: Response = await chai.request(app)
      .post('/matches')
      .set({
        authorization: token
      })
      .send(createMatchWithInvalidTeam);

    const body = response.body;
    chai.expect(body).to.deep.equal(
      { "message": "There is no team with such id!" }
    );
  });

  it('Dont\'t should to create new match on data base with invalid token', async () => {
    const response: Response = await chai.request(app)
      .post('/matches')
      .set({
        authorization: invalidToken
      })
      .send(createMatch);

    const body = response.body;
    chai.expect(body).to.deep.equal(
      { "message": "Token must be a valid token" }
    );
  });

  it('Should change key inProgress on database to false, finishing the match on route /matches/:id/finish', async () => {
    sinon.stub(Users, 'findOne').resolves(validReturnUser as Users); // to token resolve
    sinon.stub(Matches, 'update').resolves();

    const response: Response = await chai.request(app)
      .patch('/matches/15/finish')
      .set({
        authorization: token
      });

    const body = response.body;
    chai.expect(body).to.deep.equal({ message: 'Finished'});
  });

  it('Should update a match on route PATCH /matches/:id', async () => {
    sinon.stub(Matches, 'update').resolves();

    const response: Response = await chai.request(app)
      .patch('/matches/15')
      .send(updateMatch);

    chai.expect(response.status).to.equal(200);
  });

  
});