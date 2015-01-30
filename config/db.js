module.exports = function (app) {

	'use strict';

	var mongoose = require('mongoose');

	var config = {
	  "db": "techpartysuggestion",
	  "host": "localhost",
	  "user": "",
	  "pw": "",
	  "port": 27017
	};

	var port = (config.port.length > 0) ? ":" + config.port : '';
	var login = (config.user.length > 0) ? config.user + ":" + config.pw + "@" : '';

	var uristring;
	if (app.get('env') === 'development') {
		uristring = "mongodb://" + login + config.host + port + "/" + config.db;
	} else {
		uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL;
	}

	var mongoOptions = { db: { safe: true } };

	// Connect to Database
	mongoose.connect(uristring, mongoOptions, function (err, res) {
	  if(err){
	    console.log('ERROR connecting to: ' + uristring + '. ' + err);
	  }else{
	    console.log('Successfully connected to: ' + uristring);
	  }
	});

}
