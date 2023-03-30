const express = require('express');
const validateToken = require('../middlewares/validateToken');
const { SaleController } = require('../controllers');

const router = express.Router();

router.post('/customer/orders', validateToken, SaleController.register);

module.exports = router;