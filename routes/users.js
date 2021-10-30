const express = require('express');
const router = express.Router();
const logger = require('npmlog');

const users = require('../controller/users.controller');

//Secures endpoints
router.use(require('../bin/tokenChecker'))

// GET users listing.
router.get('/', users.getUsers);

module.exports = router;