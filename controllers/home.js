'use strict';

var home = (function () {

  var useful = require('../helper/useful'),
      Suggestion = require('../models/suggestion'),
      techparty = useful.techparty,
      year = useful.year,
      exports = {};

  exports.home = function (req, res) {
    res.render('home', {
      suggestions: useful.suggestionsDefault,
      techparty: techparty,
      year: year
    });
  };

  exports.submit = function (req, res) {
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
          }

          req.flash('info', 'Seus dados foram atualizados.');
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

          req.flash('info', 'Tchê, obrigado por ajudar a ' + techparty + ' ' + year  + ' ser o melhor evento de todos os tempos');
        });
      }

      return res.redirect('/');
    });
  };

  return exports;

})();

module.exports = home;