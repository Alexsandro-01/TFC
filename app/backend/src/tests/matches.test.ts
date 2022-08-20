import * as sinon from 'sinon';
import * as chai from 'chai';
import { Response }  from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');

import Matches from '../database/models/Matches';
import { matches } from './mocks';
import { app } from '../app';

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
});