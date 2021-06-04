
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const DonHang = new Schema({
  nguoimua: {type: String},
  SDTnguoimua: {type: String},
  DiaChinguoimua: {type: String},  
  ngaygiao: {type: Date},
  ngaytra: {type: Date},
  slSP: {type: Number},
  id_nguoiban: {type: String},
  nguoiban: {type: String},
  tongtien: {type: Number},
  trangthai: {type: String},
}, {timestamps: true});

//Add plugin 
DonHang.plugin(mongooseDelete, {
  deletedAt : true,
  overrideMethods: 'all', 
});

module.exports = mongoose.model('DonHang', DonHang, 'donhang');
