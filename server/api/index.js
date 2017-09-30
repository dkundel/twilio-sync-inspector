const { Router } = require('express');

const router = Router();

router.get('/token', require('./token'));

module.exports = router;