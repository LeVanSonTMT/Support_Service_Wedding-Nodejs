
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Masanpham = new Schema({
  ma: {type: String},
  ten: {type: String}
}, {timestamps: true});

//Add plugin 
Masanpham.plugin(mongooseDelete, {
  deletedAt : true,
  overrideMethods: 'all', 
});

module.exports = mongoose.model('Masanpham', Masanpham, 'masp');
