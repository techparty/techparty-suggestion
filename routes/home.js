'use strict';

module.exports = function (app) {

  var routes = require('../controllers/home');

  app.get('/', routes.home);
  app.post('/submit', routes.submit);

};