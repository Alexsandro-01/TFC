import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

chai.use(chaiHttp);

import { Response } from 'superagent';
import { 
  validLogin,
  validReturnUser,
  token,
  invalidLoginEmail,
  invalidLoginPassword,
 } from './mocks';

describe('Behavior of the /login route', () => {

  describe('Succes cases', () => {
    beforeEach(() => {
      sinon.stub(Users, 'findOne').resolves(validReturnUser as Users);
      sinon.stub(jwt, 'sign').resolves(token)
    });
  
    afterEach(sinon.restore);
  
    it('Should return status 200 if valid user', async () => {
      const response: Response = await chai.request(app)
        .post('/login').send(validLogin);
  
      chai.expect(response.status).to.equal(200);
    });
  
    it('Should return a token if valid user', async () => {
      const response: Response = await chai.request(app)
        .post('/login').send(validLogin);
      
      const body = response.body;
      chai.expect(body.token).to.equal(token);
    });
  });

  describe('Failure cases', () => {

    beforeEach(() => {
      sinon.stub(Users, 'findOne').resolves(validReturnUser as Users);
    });
  
    afterEach(sinon.restore);

    it('Should return a message "All fields must be filled" and status 400 if email is\'nt provaided', async () => {
      const response: Response = await chai.request(app)
        .post('/login').send({ email: validLogin.email });
        
      const body = response.body;
      const erroMessage = "All fields must be filled"
      chai.expect(body.message).to.equal(erroMessage);
      chai.expect(response.status).to.equal(400);
    });
  
    it('Should return a message "All fields must be filled" and status 400 if password is\'nt provaided', async () => {
      const response: Response = await chai.request(app)
        .post('/login').send({ password: validLogin.password });
      
      const body = response.body;
      const erroMessage = "All fields must be filled"
      chai.expect(body.message).to.equal(erroMessage);
      chai.expect(response.status).to.equal(400);
    });

    it('Should return a message "Incorrect email or password" and status 401 if wrong password', async () => {
      const response: Response = await chai.request(app)
        .post('/login').send(invalidLoginPassword);
      
      const body = response.body;
      const erroMessage = "Incorrect email or password"
      chai.expect(body.message).to.equal(erroMessage);
      chai.expect(response.status).to.equal(401);
    });
  
  });

  describe('Failure case with wrong email', () => {
    
    beforeEach(() => {
      sinon.stub(Users, 'findOne').resolves(null);
    });

    it('Should return a message "Incorrect email or password" and status 401 if wrong email', async () => {
      const response: Response = await chai.request(app)
        .post('/login').send(invalidLoginEmail);
      
      const body = response.body;
      const erroMessage = "Incorrect email or password"
      chai.expect(body.message).to.equal(erroMessage);
      chai.expect(response.status).to.equal(401);
    });
  })
})