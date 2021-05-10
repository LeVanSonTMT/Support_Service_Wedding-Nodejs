
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const NhanVien = new Schema({
  ten: {type: String},
  sdt: {type: String},
  gioitinh: {type: String},
  email: {type: String},
  loai: {type: Number},
  ngaysinh: {type: Date, default: Date.now()},
  diachi: {type: String},
  username: {type: String},
  password: {type: String},
  avt: {type: String},
  
}, {timestamps: true}
);

//Add plugin 
NhanVien.plugin(mongooseDelete, {
  deletedAt : true,
  overrideMethods: 'all', 
});

module.exports = mongoose.model('NhanVien', NhanVien, 'taikhoan');
