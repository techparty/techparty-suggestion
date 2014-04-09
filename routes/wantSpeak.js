module.exports = function (app) {

  'use strict';

  var useful = require('../helper/useful'),
      techparty = useful.techparty,
      year = useful.year,
      routes = {},
      mailer = require('../config/mailer');

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

  app.get('/quero-palestrar', routes.want_speak);
  app.post('/quero-palestrar/submit-speaker', routes.submit_speaker);

};