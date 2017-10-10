var express = require('express');
var app = express();
var currentDirectory = __dirname;
var pry = require('pryjs');

module.exports = app;

require('./config/express')(app, currentDirectory, pry);

