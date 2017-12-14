'use strict';

require('babel-core/register')

// Set default node environment to development
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Export the application
exports = module.exports = require('./app');
