const express = require("express");
const router = express.Router();

const authorize = require('../lib/authorize');
const labelRouter = require('./api/labels');

router.use(authorize);

router.use('/v1/labels', labelRouter);

module.exports = router;
