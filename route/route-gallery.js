'use strict';

const Gallery = require('../model/gallery');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

const ERROR_MESSAGE = 'Authorization Failed';


module.exports = router => {
  router.route('/gallery/:id?')
    .post(bearerAuthMiddleware, bodyParser, (req, res) => {
      // do I have a user in my req?
      // TODO: Add error checking

      req.body.userId = req.user._id;
      // console.log(req.user);

      return new Gallery(req.body).save()
        .then(createdGallery => res.status(201).json(createdGallery))
        .catch(error => errorHandler(error, res));
    })

    .get(bearerAuthMiddleware, (req, res) => {
      // returns one gallery
      // TODO: add extra checks
      if (req.params._id) {
        return Gallery.findById(req.params._id)
          .then(gallery => res.status(200).json(gallery))
          .catch(error => errorHandler(error, res));
      }

      // returns all the galleries
      return Gallery.find()
        .then(galleries => {
          let galleriesIds = galleries.map(gallery => gallery._id);

          res.status(200).json(galleriesIds);
        })
        .catch(error => errorHandler(error, res));
    })
    .put(bearerAuthMiddleware, bodyParser, (req, res) => {
      Gallery.findOne({
        userId: req.user._id,
        _id: req.params.id,
      })
        // .then(/* could do some error handling here as well */)
        .then(gallery => {
          // console.log('gallery route', gallery)
          if (!gallery) return Promise.reject(new Error('Authorization Error.'));
          return gallery.set(req.body).save();
        })
        .then(() => res.sendStatus(204))
        .catch(error => errorHandler(error, res));

      // Gallery.findById(req.params._id)
      // .then(gallery => {
      //   if(gallery.userId.toString() === req.user._id.toString()){
      //     gallery.name = req.body.name || gallery.name;
      //     gallery.description = req.body.description || gallery.description;

      //     return gallery.save();
      //   }

      //   return errorHandler(new Error(ERROR_MESSAGE),res);
      // })
    })

    .delete(bearerAuthMiddleware, (req, res) => {
      return Gallery.findById(req.params._id)
        .then(gallery => {
          if (gallery.userId.toString() === req.user._id.toString())
            return gallery.remove();

          return errorHandler(new Error(ERROR_MESSAGE), res);
        })
        .then(() => res.sendStatus(204))
        .catch(error => errorHandler(error, res));
    });
};
