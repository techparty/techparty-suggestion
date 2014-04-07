module.exports = function (app) {

  'use strict';

  var routes = {};

  routes.index = function (req, resp) {
    resp.render('index');
  };

  routes.submit = function (req, resp) {
  	console.log(req.body.opt.username);
  	console.log(req.body.opt.useremail);
  };

  app.get('/', routes.index);
  app.post('/submit', routes.submit);

};