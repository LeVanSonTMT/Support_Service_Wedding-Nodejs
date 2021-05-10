
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const TTtuyendung = new Schema({
  tenTD: {type: String},
  noidungTD: {type: String},
  hethan:{type: Date}
}, {timestamps: true});

//Add plugin 
TTtuyendung.plugin(mongooseDelete, {
  deletedAt : true,
  overrideMethods: 'all', 
});

module.exports = mongoose.model('TTtuyendung', TTtuyendung,'tuyendungs');
