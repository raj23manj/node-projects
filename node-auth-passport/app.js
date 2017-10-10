var express = require('express');
var app = express();
var currentDirectory = __dirname;

module.exports = app;

require('./config/express')(app, currentDirectory);

