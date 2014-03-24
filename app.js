'use strict';

var express = require('express'),
	app = express(),
	hbs = require('hbs'),
	routes = require('./routes');

app.use(express.static('assets'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
//app.use(express.bodyParser());

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.home);

console.log('init app');

var port = Number(process.env.PORT || 3000);
app.listen(port, function () {
  console.log("Listening on " + port);
});