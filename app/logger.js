const winston = require('winston');
const config = require('./config');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: config.logger.transports.console.level,
            colorize: true,
            timestamp: true
            }),
        ]
});

module.exports = logger;
