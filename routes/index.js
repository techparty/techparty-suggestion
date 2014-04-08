module.exports = function (app) {

  'use strict';

  var useful = require('../helper/useful'),
      Suggestion = require('../models/suggestion'),
      techparty = useful.techparty,
      year = useful.year,
      routes = {};

  routes.home = function (req, res) {
    res.render('home', {
      suggestions: useful.suggestionsDefault,
      techparty: techparty,
      year: year
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
    var suggestions = Suggestion.find(function (err, suggestions) {
      if (err) return console.error(err);

      var unique = [];
      useful.forEach(suggestions, function (el) {
        useful.forEach(el.suggestion, function (value) {
          if (value) {
            unique.push(value);
          }
        });
      });

      var result = [];
      useful.forEach(useful.uniqueArray(unique), function (value) {
        var count = 0;
        useful.forEach(suggestions, function (el) {
          useful.forEach(el.suggestion, function (suggestion) {
            if (suggestion == value) {
              count += 1;
            }
          });
        });
        result.push({name: value, value: count});
      });

      res.render('rating', {
        suggestions: result.sort(useful.compareDesc),
        techparty: techparty,
        year: year
      })
    })
  }

  app.get('/', routes.home);
  app.post('/submit', routes.submit);
  app.get('/rating', routes.rating);

};