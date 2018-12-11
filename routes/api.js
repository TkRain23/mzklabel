const express = require("express");
const router = express.Router();

const labelRouter = require('./api/labels');

router.use('/v1/labels', labelRouter);

module.exports = router;
