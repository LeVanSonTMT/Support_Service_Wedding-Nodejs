const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')

const nhanvienController = require('../app/controlers/NhanVienControllers');
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


router.get('/:id/edit', setCooky.RangBuocLogin, nhanvienController.edit);
router.post('/:id/update', upload.single('avt') , nhanvienController.update);
router.post('/:id/delete', nhanvienController.delete);
router.post('/:id/restore', nhanvienController.restore);
router.post('/:id/anNV', nhanvienController.anNV);

router.post('/store', upload.single('avt') , nhanvienController.store);

router.get('/create', setCooky.RangBuocLogin, nhanvienController.create);
router.get('/quanLyNV',  setCooky.RangBuocLogin,nhanvienController.quanLyNV);
router.get('/quanLyNVDaXoa', setCooky.RangBuocLogin, nhanvienController.quanLyNVDaXoa);
router.get('/:slug', setCooky.RangBuocLogin, nhanvienController.show);
router.get('/', nhanvienController.index);

module.exports = router;