'use strict';

const fs = require('fs');
const del = require('del');
const path = require('path');
const Gallery = require('./gallery');
const mongoose = require('mongoose');
const tempDir = `${__dirname}`; //points to our temp .git keep directory
const awsS3 = require('../lib/aws-s3');

const Photo = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'auth', required: true},
  galleryId: {type: mongoose.Schema.Types.ObjectId, ref: 'gallery', required: true},
  objectKey: {type: String, required: true, unique: true},
  imageURI: {type: String, required: true, unique: true},
});

Photo.statics.upload = function (request) {
  return new Promise((resolve, reject) => {
    if(!request.file) return reject(new Error('Multi-part Form Data Error. File Not PResent On Request'));
    if(!request.file.path) return reject(new Error('Multi-part Form Data Error. File Path Not PResent On Request'));

    let params = {
      ACL: 'public read',
      Bucket: process.env.AWS_BUCKET,
      Key: `${request.file.filename}${path.extname(request.file.originalname)}`, //setting the file name
      Body: fs.createReadStream(request.file.path),
    };
    return awsS3.uploadProm(params) //ships all the data to s3
      .then(data => {
        del([`${tempDir}/${request.file.filename}`]); //sotres temporary binary data. del is short for fs.link. Kind of works as a middleware to check on what data has been processed

        let photoData = {
          name: request.body.name,
          description: request.body.description,
          userId: request.user._id,
          galleryId: request.body.galleryId,
          imageURI: data.Location,
          objectKey: data.Key,
        };
        resolve(photoData);
      })
      .catch(reject);
  });
};
//Photos.methods.delete

module.exports = mongoose.model('photo', Photo);