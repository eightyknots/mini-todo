const express = require('express');
const router = express.Router();

router.use('/tasks', require('./tasks'));
router.use('/version', require('./version'));

module.exports = router;