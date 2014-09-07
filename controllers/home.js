'use strict';

var useful = require('../helper/useful');
var	Suggestion = require('../models/suggestion');
var	techparty = useful.techparty;
var	year = useful.year;

module.exports = {

	home : function (req, res) {
    res.render('home', {
      suggestions: useful.suggestionsDefault,
      techparty: techparty,
      year: year
    });
  },

	submit : function (req, res) {
    var userEmail = req.body.opt.useremail;
    var suggestions = useful.getSuggestions(req.body.opt);
		var messageError = 'Ops, ocorreu uma falha. Verifique os campos obrigatórios (*) e tente novamente :)';

    Suggestion.find({ email: userEmail }, function (err, suggestion) {

      var message;

      if (suggestion.length > 0) { // update
        suggestion = suggestion[0];
        suggestion.suggestion = suggestions;
        message = 'Seus dados foram atualizados.';
      } else { // insert
        var userName = req.body.opt.username;
        suggestion = new Suggestion({
          name: userName,
          email: userEmail,
          suggestion: suggestions
        });
        message = 'Tchê, obrigado por ajudar a ' + techparty + ' ' + year  + ' ser o melhor evento de todos os tempos';
      }

      suggestion.save(function (err, suggestion) {
        if (err) {
          req.flash('error', messageError);
          return console.error(err);
        }

        req.flash('info', message);
      });

      res.redirect('/');
    });
  }

};
