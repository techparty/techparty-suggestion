module.exports = function (app) {

  'use strict';

  var useful = require('../helper/useful'),
      Suggestion = require('../models/suggestion'),
      routes = {};

  routes.index = function (req, res) {
    res.render('index', {
      suggestions: useful.suggestionsDefault,
      techparty: useful.techparty,
      year: useful.year
    });
  };

  routes.submit = function (req, res) {
    var userEmail = req.body.opt.useremail;

    Suggestion.find({ email: userEmail }, function (err, suggestion) {

      if (suggestion.length > 0) {
        var message = 'Hey ' + userEmail + ', você já enviou sua sugestão :)';
        req.flash('error', message);
      } else {
        var userName = req.body.opt.username,
            suggestions = useful.getSuggestions(req.body.opt);

        suggestion = new Suggestion({
          name: userName,
          email: userEmail,
          suggestion: suggestions
        });

        suggestion.save(function (err, suggestion) {
          if (err) return console.error(err);
          var message = 'Obrigado por ajudar a ' + techparty + ' ' + year  + ' ser o melhor evento de todos os tempos';
          req.flash('info', message);
        });
      }

      return res.redirect('/');
    });
  };

  routes.rating = function (req, res) {
    res.render('rating');
  }

  app.get('/', routes.index);
  app.post('/submit', routes.submit);
  app.get('/rating', routes.rating);

};