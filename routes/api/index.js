const express = require('express');
const router = express.Router();
const rosaryRoute = require('./rosary');
const testRoute = require('./test');
const vttRoute = require('./vtt');

router.use('/rosary', rosaryRoute);
router.use('/test', testRoute);
router.use('/vtt', vttRoute);

module.exports = router;