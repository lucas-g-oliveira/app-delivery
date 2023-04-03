const express = require('express');
const validateToken = require('../middlewares/validateToken');
const restrictToAdmin = require('../middlewares/restrictedToAdmin');
const { adminController } = require('../controllers');

const router = express.Router();
const adminManage = '/admin/manage';

router.get(adminManage, restrictToAdmin, validateToken, adminController.findAll);
router.put(adminManage, restrictToAdmin, validateToken, adminController.registerUser);
router.delete(adminManage, restrictToAdmin, validateToken, adminController.deleteUser);

module.exports = router;
