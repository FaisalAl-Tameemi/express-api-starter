const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'error-file',
      filename: `${__dirname}/../../../error.log`,
      level: 'error',
    }),
  ],
});

module.exports = logger;
