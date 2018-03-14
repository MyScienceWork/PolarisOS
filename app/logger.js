const winston = require('winston');
const config = require('./config');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: config.logger.transports.console.level,
            colorize: true,
        }),
//         new (winston.transports.File)({
//             filename: config.logger.logFile,
//             level: config.logger.transports.file.level,
//             colorize: true,
//         }),
    ],
});

module.exports = logger;
