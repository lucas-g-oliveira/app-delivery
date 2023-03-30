const express = require('express');
const { productController } = require('../controllers');
// const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.get('/products', productController.findAll);

module.exports = router;