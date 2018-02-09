
'use strict';

//Route Dependencies
const Photo = require('../model/photo');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const bearerAuth = require('../lib/bearer-auth-middleware');


//Photo Upload Dependencies
const multer = require('multer'); //middleware that parser and modifies
const tempDir = `${__dirname}/../temp`;
const upload = multer({ dest: tempDir });

module.exports = function (router) {
  router.get('/photos/me', bearerAuth, (req, res) => {
    Photo.find({userId: req.user._id})//brings back all of MY photots
      .then(photos => photos.map(photo => photo._id))
      .then(ids => res.status(200).json(ids))
      .catch(err => errorHandler(err, res));
  });

  router.route('/photo/:id?')
    .post(bearerAuth, bodyParser, upload.single('image'), (req, res) => { //upload.single() grabs one sinngle omage from the database
      Photo.upload(req)
        .then(photoData => new Photo(photoData).save())
        .then(pic => res.status(201).json(pic))
        .catch(err => errorHandler(err, res));
    })
    .get(bearerAuth, (req, res) => {
      if (req.params.id) {
        return Photo.findById(req.params.id)
          .then(pic => res.status(200).json(pic))
          .catch(err => errorHandler(err, res));
      }

      Photo.find({ userID: req.query.userId })
        .then(photos => photos.map(photo => photo._id))
        .then(ids => res.status(200).json(ids))
        .catch(err => errorHandler(err, res));
    });//last couple mintues for finish uppers and edits/debugs
  // .delete (bearerAuth, (req, res) => {
  //   Photo.findOne({ userId: req.user._id, _id: req.params.id })
  //     .then(pic => {
  //       return pic
  //         ? pic.delete() // Define this on Photo.methods.delete
  //         : Promise.reject(new Error('Path Error. Photo not found'));
  //     })
  //     .then(() => res.sendStatus(204))
  //     .catch(err => errorHandler(err, res));
  // });
};