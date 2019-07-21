const mongoose = require('mongoose');
const config = require('../config/database');

const InsTypeSchema = mongoose.Schema({
  title: String,
  insid: Number,
  pic: String,
  peoplebought: Number,
  rate: Number,
  short: String,
  long: String,
  boughtprice: Number,
  claimprice: Number,
});

const InsType = module.exports = mongoose.model('instype', InsTypeSchema);

module.exports.getAllType = function(callback) {
  InsType.find({}, callback);
};

module.exports.getTypeById = function (id, callback) {
  InsType.findById(id, callback);
};

module.exports.addType = function(newType) {
  newType.save((err, suc) => {});
};