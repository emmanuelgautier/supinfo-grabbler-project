'use strict';

var express      = require('express'),
    session      = require('express-session'),
    favicon      = require('serve-favicon'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    flash        = require('connect-flash'),
    hbs          = require('express-hbs');

module.exports = function(app, sessionStore, config) {
  app.use(favicon( config.root + '/public/favicon.ico'));
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

  app.use(flash());

  app.set('view engine', 'hbs');
  app.set('views', config.root + '/app/views');

  app.engine('hbs', hbs.express3({
    partialsDir: config.root + '/app/views/partials',
    layoutsDir: config.root + '/app/views/layouts',
    defaultLayout: config.root + '/app/views/layouts/main.hbs',
    extname: '.hbs',
  }));
};
