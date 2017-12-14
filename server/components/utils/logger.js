const { Logger, transports } = require('winston')

const baseLogger = new Logger({
  transports: [
    new (transports.File)({
      name: 'error-file',
      filename: `${__dirname}/../../../error.log`,
      level: 'error',
    }),
    new (transports.Console)({}),
  ],
});

module.exports = baseLogger;
