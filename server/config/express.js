/**
 * Express configuration
 */

'use strict';

import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import config from './environment';
import passport from 'passport';
import session from 'express-session';
import sqldb from '../sqldb';
// import lusca from 'lusca';
import expressSequelizeSession from 'express-sequelize-session';

const Store = expressSequelizeSession(session.Store);

module.exports = function(app) {
  const env = app.get('env');

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  // Persist sessions with mongoStore / sequelizeStore
  // We need to enable sessions for passport-twitter because it's an
  // oauth 1.0 strategy, and Lusca depends on sessions
  app.use(session({
    secret: config.secrets.session,
    saveUninitialized: true,
    resave: false,
    store: new Store(sqldb.sequelize)
  }));

  /**
   * ---------------------------------------
   * Lusca - express server security // only when on production
   * https://github.com/krakenjs/lusca
   * ---------------------------------------

    if ('production' === env) {
      app.use(lusca({
        csrf: {
          angular: true
        },
        xframe: 'SAMEORIGIN',
        hsts: {
          maxAge: 31536000, //1 year, in seconds
          includeSubDomains: true,
          preload: true
        },
        xssProtection: true
      }));
    }

   */

  app.set('appPath', path.join(config.root, 'client'));

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
  }

  if ('development' === env) {
    app.use(require('connect-livereload')());
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
