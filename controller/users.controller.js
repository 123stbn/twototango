const logger = require('../logger').Logger
const path = require('path');
const { readdirSync } = require('fs')

function getDirectories(source) {
    return readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
}

function getUsers(req, res) {
    let users = []
    logger.info('USERS', 'Current OS ' + process.platform)
    switch (process.platform) {
        case 'win32':
            users = getDirectories(process.cwd().split(path.sep)[0] + '/Users');
            break;
        default:
            users = getDirectories('/home/');
            break;
    }
    logger.info('USERS', 'Obtained directories [' + users + ']')

    res.status(200).json({ "userList": users });
}

module.exports = {
    getUsers: getUsers
}