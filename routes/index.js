module.exports = function (app) {

  'use strict';

  var routes = {}

  routes.index = function (req, resp) {
    resp.render('index');
  };

  routes.submit = function (req, resp) {
  	req.send();
  };

  app.get('/', routes.index);
  app.post('/submit', routes.submit);

};