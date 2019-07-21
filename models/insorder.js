const mongoose = require('mongoose');
const config = require('../config/database');

const InsOrderSchema = mongoose.Schema({
  userid: Number,
  insid: Number,
  copies: Number,
  status: Number,
  msg: String
});

const InsOrder = module.exports = mongoose.model('insorder', InsOrderSchema);

module.exports.getOrderById = function(userid, callback) {
  InsOrder.find({userid: userid}, callback);
};

module.exports.addOrder = function(newOrder, callback) {
  newOrder.save(callback);
};

module.exports.updateOrder = function(orderid, newstatus) {
  InsOrder.update({orderid: orderid}, { $set: {
    "status": newstatus
    }}, (err, suc) => {});
}

module.exports.checkClaim = function() {
  return true;
}