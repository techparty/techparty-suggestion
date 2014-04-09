'use strict';

var mailer = (function () {

  var express = require('express'),
      app = express(),
      exports = {},
      nodemailer = require("nodemailer"),
      yaml_config = require('node-yaml-config'),
      config = app.get('env') === 'development' ? yaml_config.load(__dirname + '/config.yml') : null,
      _smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER || config.email.user,
          pass: process.env.EMAIL_PASS || config.email.pass
        }
      });

  function _sendMail (mailOptions, callback) {
    _smtpTransport.sendMail(mailOptions, function (error, response) {
      _smtpTransport.close();
      if(error){
        console.log(error);
        callback(false);
      }else{
        console.log("Message sent: " + response.message);
        callback(true);
      }
    });
  }

  exports.sendMail = function (mailOptions, callback) {
    _sendMail(mailOptions, callback);
  }

  return exports;

})();

module.exports = mailer;