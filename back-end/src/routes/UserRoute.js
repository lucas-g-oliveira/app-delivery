const express = require('express');
const { userController } = require('../controllers');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/login', userController.login);

module.exports = router;