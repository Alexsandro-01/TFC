import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { Response } from 'superagent';

import allTeams from './mockTeams';
import finishedMatches from './mockFinishedMatches';
import leaderboard from './mockLeaderBoard';

chai.use(chaiHttp);

const { expect } = chai;

describe('Behavior of the /leaderboard route', () => {
  afterEach(sinon.restore);

  it('Should return the teams classification in away games and home games', async () => {
    sinon.stub(Teams, 'findAll').resolves(allTeams as unknown as Teams[]);
    sinon.stub(Matches, 'findAll').resolves(finishedMatches as unknown as Matches[]);

    const response = await chai.request(app).get('/leaderboard');

    const body = response.body;
    chai.expect(body).to.deep.equal(leaderboard);
  });
});
