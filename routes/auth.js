const express = require('express');

const loginController = require('../controllers/auth-controller');

const router = express.Router();

router.get('/', loginController);

module.exports = router;