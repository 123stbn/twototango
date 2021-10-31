
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.Console({})]
});

var Logger = (exports.Logger = {});

Logger.info = function (prefix, msg) {
    logger.info(prefix + ' | ' + msg)

};

Logger.debug = function (prefix, msg) {
    logger.debug(prefix + ' | ' + msg)
};

Logger.error = function (prefix, msg) {
    logger.error(prefix + ' | ' + msg)
};