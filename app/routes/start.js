const express = require('express');
const router = express.Router();

/**
 * Response for / (Just an hello world)
 */
router.get('/', function (req, res) {
    res.json('Check the ASMProtocol manual for valid entry points');
});

module.exports = router;
