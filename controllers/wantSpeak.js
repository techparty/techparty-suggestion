'use strict';

var wantSpeak = (function () {

  var exports = {},
      useful = require('../helper/useful'),
      techparty = useful.techparty,
      year = useful.year,
      mailer = require('../config/mailer');

  exports.want_speak = function (req, res) {
    res.render('quero-palestrar', {
      techparty: techparty,
      year: year
    });
  };

  exports.submit_speaker = function (req, res) {
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
        text: speakerDesc,
        html: '<h2>Desejo palestrar na TechParty 2015</h2><br /><br /><strong>Nome: </strong>' + speakerName + '<br /><strong>Email: </strong>' + speakerEmail + '<br /><br />' + speakerDesc
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

  return exports;

})();

module.exports = wantSpeak;