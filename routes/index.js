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
    var userEmail = req.body.opt.useremail,
        suggestions = useful.getSuggestions(req.body.opt);

    Suggestion.find({ email: userEmail }, function (err, suggestion) {

      if (suggestion.length > 0) {
        suggestion[0].suggestion = suggestions;
        suggestion[0].save()        
        req.flash('info', 'Seus dados foram atualizados.');
      } else {
        var userName = req.body.opt.username;

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
      });
    });
  };

  routes.want_speak = function (req, res) {
    
    
    res.render('quero-palestrar', {
      techparty: techparty,
      year: year
    });
  };


  app.get('/', routes.home);
  app.post('/submit', routes.submit);
  app.get('/rating', routes.rating);
  app.get('/quero-palestrar', routes.want_speak);

};