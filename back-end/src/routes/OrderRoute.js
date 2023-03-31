const express = require('express');
const validateToken = require('../middlewares/validateToken');
const { SaleController } = require('../controllers');

const router = express.Router();
const customerOrders = '/customer/orders';

router.post(customerOrders, validateToken, SaleController.register);
router.get(customerOrders, validateToken, SaleController.order);
router.put(`${customerOrders}/:id`, validateToken, SaleController.changeStatus);

module.exports = router;