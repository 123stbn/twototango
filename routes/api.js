
const express = require('express');
const router = express.Router();

const api = require('../controller/api.controller')

router.post("/", api.api);
router.post("/login", api.login);
router.post("/token", api.refreshToken);

module.exports = router;