'use strict';

const faker = require('faker');
const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
const image = (`${__dirname}/homer.jpg`);


describe('POST /api/v1/gallery', function () {
  beforeAll(server.start);
  beforeAll(() => mocks.auth.createOne().then(data => this.mocksAuth = data));
  afterAll(server.stop);
  afterAll(mocks.auth.removeAll);
  afterAll(mocks.gallery.removeAll);

  describe('Valid request', () => {
    it('should return a 201 CREATED status code', () => {
      let mocksgallery = null;
      return mocks.gallery.createOne()
        .then(mocks => {
          mocksgallery = mocks;
          return superagent.post(`:${process.env.PORT}/api/v1/photo`)
            .set('Authorization', `Bearer ${mocks.token}`)
            .field('name', faker.lorem.word())
            .field('desc', faker.lorem.words(5))
            .field('galleryId', `${mocksgallery.gallery._id}`)
            .attach('image', image);
        })
        .then(res => {
          expect(res.status).toEqual(201);
          expect(res.body).toHaveProperty('name');
          expect(res.body).toHaveProperty('desc');
          expect(res.body).toHaveProperty('_id');
        });
    });
  });

  describe('Invalid request', () => {
    it('should return a 401 error', () => {
      let mocksgallery = null;
      return mocks.gallery.createOne()
        .then(mocks => {
          mocksgallery = mocks;
          return superagent.post(`:${process.env.PORT}/api/v1/photo`)
            .set('Authorization', 'Bearer BADTOKEN')
            .field('name', faker.lorem.word())
            .field('desc', faker.lorem.words(5))
            .field('galleryId', `${mocksgallery.gallery._id}`)
            .attach('image', image)
            .catch(err => expect(err.status).toEqual(401));
        });
    });
    it('should return a 404 error', () => {
      let mocksgallery = null;
      return mocks.gallery.createOne()
        .then(mocks => {
          mocksgallery = mocks;
          return superagent.post(`:${process.env.PORT}/api/v1/images`)
            .set('Authorization', `Bearer${mocks.token}`)
            .field('name', faker.lorem.word())
            .field('desc', faker.lorem.words(5))
            .field('galleryId', `${mocksgallery.gallery._id}`)
            .attach('image', image);
        })
        .catch(err => expect(err.status).toEqual(404));
    });
  });
});