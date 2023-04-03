const express = require('express');
const validateToken = require('../middlewares/validateToken');
const { SaleController } = require('../controllers');

const router = express.Router();
const customerOrders = '/customer/orders';
const sellerOrders = '/seller/orders';

router.post(customerOrders, validateToken, SaleController.register);
router.get(customerOrders, validateToken, SaleController.order);
router.put(`${customerOrders}/:id`, validateToken, SaleController.changeStatus);

router.get(sellerOrders, validateToken, SaleController.order);

module.exports = router;