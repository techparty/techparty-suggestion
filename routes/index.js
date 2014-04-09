module.exports = function (app) {

  'use strict';

  var useful = require('../helper/useful'),
      Suggestion = require('../models/suggestion'),
      techparty = useful.techparty,
      year = useful.year,
      routes = {},
      mailer = require('../config/mailer');

  routes.home = function (req, res) {
    res.render('home', {
      suggestions: useful.suggestionsDefault,
      techparty: techparty,
      year: year
    });
  };

  routes.submit = function (req, res) {
    var userEmail = req.body.opt.useremail,
        suggestions = useful.getSuggestions(req.body.opt),
        messageError = 'Ops, ocorreu uma falha. Verifique os campos obrigatórios (*) e tente novamente :)';

    Suggestion.find({ email: userEmail }, function (err, suggestion) {

      if (suggestion.length > 0) { // update
        suggestion[0].suggestion = suggestions;
        suggestion[0].save(function (err, sugg) {
          if (err) {
            req.flash('error', messageError);
            return console.error(err);
          } else {
            req.flash('info', 'Seus dados foram atualizados.');
          }
        });
      } else { // insert
        var userName = req.body.opt.username;

        suggestion = new Suggestion({
          name: userName,
          email: userEmail,
          suggestion: suggestions
        });

        suggestion.save(function (err, suggestion) {
          if (err) {
            req.flash('error', messageError);
            return console.error(err);
          }
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

  routes.submit_speaker = function (req, res) {
    var speakerName = req.body.speaker_name,
        speakerEmail = req.body.speaker_email,
        speakerDesc = req.body.speaker_desc;

    if (!speakerName || !speakerEmail || !speakerDesc) {
      console.log('todos os campos tem preenchimento obrigatório');
    } else {
      mailer.sendMail({
        from: speakerName + ' <' + speakerEmail + '>',
        to: 'rohersmoura@gmail.com, fporazzi46@gmail.com',
        subject: 'Quero palestrar na TechParty 2015',
        text: speakerDesc
      }, function (response) {
        if (response) {
          req.flash('info', 'Email enviado com sucesso!');
        } else {
          req.flash('error', 'Ops, aconteceu algo inexperado. Tente novamente.');
        }

        return res.redirect('/');
      });
    }
  };

  app.get('/', routes.home);
  app.post('/submit', routes.submit);
  app.get('/rating', routes.rating);
  app.get('/quero-palestrar', routes.want_speak);
  app.post('/submit-speaker', routes.submit_speaker);

};