'use strict';

module.exports = function (app) {

  var routes = require('../controllers/wantSpeak');

  app.get('/quero-palestrar', routes.want_speak);
  app.post('/quero-palestrar/submit-speaker', routes.submit_speaker);

};