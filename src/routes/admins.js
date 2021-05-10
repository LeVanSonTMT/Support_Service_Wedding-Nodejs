const express = require('express');
const router = express.Router();
const setCooky = require('../util/RangBuocLogin');
const adminController = require('../app/controlers/adminControllers');

router.get('/tk', setCooky.RangBuocLogin , adminController.tk);
router.get('/DangXuat', adminController.dangXuat);
router.get('/DangNhap', adminController.dangNhap);
router.post('/XLDangNhap', adminController.XLlogin);

module.exports = router;