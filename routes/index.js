module.exports = function (app) {

  'use strict';

  var routes = {}

  routes.index = function (req, resp) {
    resp.render('index');
  }

  app.get('/', routes.index);

};