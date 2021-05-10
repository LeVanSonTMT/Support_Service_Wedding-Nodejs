const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const dichvuController = require('../app/controlers/DichVuController');
const setCooky = require('../util/RangBuocLogin');
const p = path.join(__dirname, '../public/img');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, p)
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
});

const upload = multer({storage: fileStorageEngine});

router.get('/:id/edit', setCooky.RangBuocLogin, dichvuController.edit);

router.post('/:id/update', upload.single('hinhanh') , dichvuController.update);

router.post('/:id/delete', dichvuController.delete);
router.post('/:id/restore', dichvuController.restore);
router.post('/:id/anSP', dichvuController.anSP);

router.post('/store', upload.single('hinhanh') , dichvuController.store);

router.get('/timkiem', dichvuController.timkiem);
router.get('/create', setCooky.RangBuocLogin, dichvuController.create);
router.get('/quanLySP', setCooky.RangBuocLogin, dichvuController.quanLySP);
router.get('/quanLySP/:type', setCooky.RangBuocLogin, dichvuController.quanLySP);
router.get('/quanLySPDaXoa', setCooky.RangBuocLogin, dichvuController.quanLySPDaXoa);
router.get('/:slug', dichvuController.show);
router.get('/', dichvuController.index);

module.exports = router;