/**
 * What's this file for?
 * This is the Sequelize initialization module.
 * It requires all the models which are a part of the API
 *    and creates an exportable DB object for other files to use.
 */

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

const db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize(config.sequelize.makeUri(), config.sequelize.options)
};

// require each model from every endpoint with sequelize
db.User = db.sequelize.import('../api/user/user.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');

// run associations from every model here
Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});


module.exports = db;
