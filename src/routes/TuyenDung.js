const express = require('express');
const router = express.Router();

const TuyenDungControler = require('../app/controlers/TuyenDungControlers');
const setCooky = require('../util/RangBuocLogin');

router.post('/:id/update', TuyenDungControler.update);
router.get('/:id/edit', setCooky.RangBuocLogin, TuyenDungControler.edit);
router.post('/:id/delete', TuyenDungControler.delete);
router.post('/:id/SoftDelete', TuyenDungControler.SoftDelete);
router.get('/quanLyTDDaXoa', setCooky.RangBuocLogin, TuyenDungControler.qlTDdelete);
router.get('/quanLyTD', setCooky.RangBuocLogin, TuyenDungControler.qlTD);
router.post('/store', TuyenDungControler.store);
router.get('/create', setCooky.RangBuocLogin, TuyenDungControler.create);
router.get('/', TuyenDungControler.index);

module.exports = router;