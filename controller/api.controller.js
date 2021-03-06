const jwt = require('jsonwebtoken')
const config = require('../config')
const logger = require('../logger').Logger
const bcrypt = require('bcrypt');

const db = require('../data/data');

const tokenList = {}

function api(req, res) {
    res.send('Ok');
}

function performLogin(user, password) {
    let foundUser = db.userDB.find((data) => user.toLowerCase() === data.username.toLowerCase());
    let authorized = false
    if (foundUser) {
        logger.info('LOGIN', 'Found User ' + foundUser.username);
        authorized = bcrypt.compareSync(password, foundUser.password)
    } else {
        logger.info('API', 'User ' + user + ' was not found');
    }
    return authorized;
}

function login(req, res) {
    let authorized = false;
    const postData = req.body;

    if (postData.username, postData.password) {
        authorized = performLogin(postData.username, postData.password)
    }
    else {
        logger.info('INFO', 'Login parameters are not valid');
        return res.status(401).json({ "error": true, "message": 'Username and password are required' });
    }

    logger.info('INFO', 'Authorized ' + authorized);

    if (authorized) {
        const user = {
            "username": postData.username.toLowerCase()
        }
        const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife })
        const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife })
        const response = {
            "status": "Logged in",
            "token": token,
            "refreshToken": refreshToken,
        }
        logger.info('INFO', 'Token created succesfully');
        tokenList[refreshToken] = response
        res.status(200).json(response);
    } else {
        return res.status(401).json({ "error": true, "message": 'Wrong username or password.' });
    }


}

function refreshToken(req, res) {
    const postData = req.body

    if (postData.username) {
        logger.info('API', 'User ' + postData.username + ' requested a new token');
        if ((postData.refreshToken) && (postData.refreshToken in tokenList)) {
            logger.info('API', 'Token exist for user ' + postData.username);
            const user = {
                "username": postData.username.toLowerCase()
            }
            const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife })
            const response = {
                "token": token,
            }
            // update the token in the list
            tokenList[postData.refreshToken].token = token
            res.status(200).json(response);

        } else {
            logger.info('API', 'Refresh token is not valid')
            res.status(401).json({ "error": true, "message": 'Refresh token is not valid' })
        }
    }
    else {
        logger.info('API', 'Username was not provided')
        return res.status(401).json({ "error": true, "message": 'Username is required' });
    }
}

module.exports = {
    api: api,
    login: login,
    refreshToken: refreshToken
}