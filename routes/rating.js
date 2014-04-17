'use strict';

module.exports = function (app) {

  var routes = require('../controllers/rating');

  app.get('/rating', routes.rating);

};