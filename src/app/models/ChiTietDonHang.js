
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const ChiTietDonHang = new Schema({
  idDonHang: {type: String},
  idsp: {type: String},
  tensp: {type: String},
  giasp: {type: Number},
  sale: {type: Number},
  soluong: {type: Number},
  ghichu: {type: String},
  thanhtien: {type: Number}
}, {timestamps: true});

//Add plugin 
ChiTietDonHang.plugin(mongooseDelete, {
  deletedAt : true,
  overrideMethods: 'all', 
});

module.exports = mongoose.model('ChiTietDonHang', ChiTietDonHang, 'chitietdonhang');
