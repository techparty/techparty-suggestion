'use strict';

var newrelic = require('newrelic');
var flash = require('express-flash');
var express = require('express');
var app = express();
var hbs = require('hbs');
var path = require('path');
var fs = require('fs');
var mongoose = require ("mongoose");
var mail = require("nodemailer").mail;

app.use(express.static('assets'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('keyboard cat'));
app.use(express.session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// Connect to database
var db = require('./config/db');

if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// models
var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function (file) {
	require(modelsPath + '/' + file);
});

// routes
var routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(function(file) {
	require(routesPath + '/' + file)(app);
});

var port = Number(process.env.PORT || 3000);
app.listen(port, function () {
	console.log("Listening on " + port);
});
