'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const mocks = require('../lib/mocks');

describe('GET /api/v1/gallery/:id?', () => {
  beforeAll(server.start);
  beforeAll(() => mocks.auth.createOne().then(data => this.mocksAuth = data));
  afterAll(server.stop);
  afterAll(mocks.auth.removeAll);
  afterAll(mocks.gallery.removeAll);

  describe('Valid reqs', () => {
    it('should return a 200 status code', () => {
      return mocks.gallery.createOne()
        .then(mocks => {
          return superagent.get(`:${process.env.PORT}/api/v1/photo`)
            .set('Authorization', `Bearer${mocks.token}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body).toBeInstanceOf(Array);
        });
    });
    it('should return a 200 status code', () => {
      return mocks.gallery.createOne()
        .then(mocks => {
          console.log(this.mocksAuth.user._id);
          return superagent.get(`:${process.env.PORT}/api/v1/photo/${this.mocksAuth.user._id}`)
            .set('Authorization', `Bearer${mocks.token}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
  });
  describe('Invalid req', () => {
    it('should return a 401 NOT AuthORIZED given back token', () => {
      return superagent.post(`:${process.env.PORT}/api/v1/photo/${this.mocksAuth.user._id}`)
        .set('Authorization', 'Bearer BADTOKEN')
        .catch(err => expect(err.status).toEqual(401));
    });
    it('should return a 404 status code', () => {
      return mocks.gallery.createOne()
        .then(mocks => {
          console.log(this.mocksAuth.user._id);
          return superagent.get(`:${process.env.PORT}/api/v1/images`)
            .set('Authorization', `Bearer${mocks.token}`);
        })
        .catch(err => expect(err.status).toEqual(404));
    });
  });
});