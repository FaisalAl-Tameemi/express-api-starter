/**
 * What's this file for?
 * This is the Sequelize initialization module.
 * It requires all the models which are a part of the API
 *    and creates an exportable DB object for other files to use.
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

let db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// require each model from every endpoint with sequelize
db.User = db.sequelize.import('../api/user/user.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');

// TODO: run associations from every model here

module.exports = db;
