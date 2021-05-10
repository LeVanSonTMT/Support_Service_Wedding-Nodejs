
const express = require('express');
const router = express.Router();

const khuyenMaiControler = require('../app/controlers/KhuyenMaiControlers');
router.get('/', khuyenMaiControler.index);

module.exports = router;