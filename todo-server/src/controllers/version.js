const express = require('express');
const router = express.Router();
const npmConfig = require('../../package.json');

router.get('/', (req, res) => {
    const version = npmConfig.version ? npmConfig.version : 'dev';
    res.json({ version });
});

module.exports = router;