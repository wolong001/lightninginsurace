const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
  name: {
      type: String
  },
  realname: String,
  password: {
      type: String
  },
  balance: Number,

});

const User = module.exports = mongoose.exports('user', UserSchema);

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
  User.findOne({ username: username}, callback);
};

module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save(callback);
      });
  });
};
module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
  });
};

module.exports.addBalance = function (username, delta, callback) {
  User.getUserByUsername(username, (err, usr) => {
      User.findByIdAndUpdate(usr._id, { $inc: {
              "balance": delta
          }}, callback);
  });
};