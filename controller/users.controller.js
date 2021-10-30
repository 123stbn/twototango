const logger = require('npmlog');
const path = require('path');
const { readdirSync } = require('fs')

function getDirectories(source) {
    return readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
}

function getUsers(req, res) {
    let users = []

    switch (process.platform) {
        case 'win32':
            users = getDirectories(process.cwd().split(path.sep)[0] + '/Users');
            break;
        default:
            users = getDirectories('/home/');
            break;
    }

    res.status(200).json({ "userList": users });
}

module.exports = {
    getUsers: getUsers
}