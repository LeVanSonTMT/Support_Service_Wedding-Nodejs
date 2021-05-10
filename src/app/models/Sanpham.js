
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Sanpham = new Schema({
  masp: {type: String},
  tensp: {type: String},
  thongtinsp: {type: String},
  giasp: {type: Number},
  khuyenmai: {type: Number},
  hinhanh: {type: String},
  trangthai: {type: String}
}, {timestamps: true}
);

//Add plugin 
Sanpham.plugin(mongooseDelete, {
  deletedAt : true,
  overrideMethods: 'all', 
});

module.exports = mongoose.model('Sanpham', Sanpham);
