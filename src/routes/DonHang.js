const express = require('express');
const router = express.Router();

const donHangController = require('../app/controlers/DonHangControlers');
const setCooky = require('../util/RangBuocLogin');

router.get('/DH_chogiao/:id', setCooky.RangBuocLogin, donHangController.DH_chogiao);

router.get('/:id/xem_sp', setCooky.RangBuocLogin, donHangController.xem_sp);
router.get('/:id/huySP', setCooky.RangBuocLogin, donHangController.huySP);

router.get('/:id/edit', setCooky.RangBuocLogin, donHangController.editHD);

router.get('/:id/updateDH_restore', setCooky.RangBuocLogin, donHangController.updateDH_restore);
router.get('/:id/updateDH_xoa', setCooky.RangBuocLogin, donHangController.updateDH_xoa);
router.get('/:id/updateDH_huy',setCooky.RangBuocLogin, donHangController.updateDH_huy);
router.get('/:id/updateDH_dagiao', setCooky.RangBuocLogin, donHangController.updateDH_dagiao);
router.get('/:id/updateDH_chogiao', setCooky.RangBuocLogin, donHangController.updateDH_chogiao);
router.get('/:id/updateDH_choduyet', setCooky.RangBuocLogin, donHangController.updateDH_choduyet);

router.post('/:id/updateHD', setCooky.RangBuocLogin, donHangController.updateHD);
router.post('/storeHD', setCooky.RangBuocLogin, donHangController.storeHD);
router.get('/create', setCooky.RangBuocLogin, donHangController.create);

router.get('/ClientCreate',  donHangController.ClientCreate);
router.post('/storeHDClient', donHangController.storeHDClient);

router.get('/DH_choduyet', setCooky.RangBuocLogin, donHangController.DH_choduyet);
router.get('/DH_chogiao', setCooky.RangBuocLogin, donHangController.DH_chogiao);
router.get('/DH_dagiao', setCooky.RangBuocLogin, donHangController.DH_dagiao);
router.get('/DH_ht', setCooky.RangBuocLogin, donHangController.DH_ht);
router.get('/DH_huy', setCooky.RangBuocLogin, donHangController.DH_huy);

module.exports = router;