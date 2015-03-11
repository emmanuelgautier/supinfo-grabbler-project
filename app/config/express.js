'use strict';

var express      = require('express'),
    session      = require('express-session'),
    favicon      = require('serve-favicon'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser');

module.exports = function(app, sessionStore, config) {
  app.use(favicon( config.root + '/public/favicon.ico', ['index.html']));
  app.use(logger('dev'));

  app.use(express.static(config.root + '/public'));

  app.use(cookieParser());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  app.use(session({
    name: 'sid',
    cookie: { 
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: 3600000
    },
    store: sessionStore,
    secret: 'key',
    saveUninitialized: true,
    resave: false
  }));
};
