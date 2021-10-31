const jwt = require('jsonwebtoken')
const config = require('../config')
const logger = require('../logger').Logger

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        logger.info('TOKEN', err.name);
        if (err.name === 'TokenExpiredError')
          return res.status(401).json({ "error": true, "message": 'JWT Expired.' });

        return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    
    logger.info('TOKEN', 'No token provided');
    
    return res.status(403).send({
      "error": true,
      "message": 'No token provided.'
    });
  
  }
}