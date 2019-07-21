const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/user');
const InsOrder = require('../models/insorder');
const config = require('../config/database');
const moment = require('moment');

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
      if(err) throw err;
      if(!user){
          return res.json({success: false, msg: '用户不存在！'});
      }
      User.comparePassword(password, user.password, (err, isMatch) => {
          if(err) throw err;
          if(isMatch){
              const token = jwt.sign(user.toJSON(), config.secret, {
                  expiresIn: 604800
              });
              res.json({
                  success: true,
                  token: 'bearer ' + token,
                  user: {
                      id: user._id,
                      name: user.name,
                      username: user.username,

                  }
              });
          } else {
              return res.json({success: false, msg: '密码错误！'});
          }
      });
  });

});

router.post('/register', (req, res, next) => {
    const user = new User(req.body);

    User.getUserByUsername(user.username, (err, user) => {
        if (err) throw err;
        if (user) {
            return res.json({ success: false, msg: '用户名已存在！' })
        }
        User.addUser(user, (err, res) => {
            if (err) {
                consle.log(err)
            } else {
                console.log(res)
            }
        })
    }
)
});

router.get('/list', (req, res, next) => {
  const userid = req.body.userid;

  InsOrder.getUserOrderList(userid, (err, orders) => {
    res.send(orders);
  });
});

module.exports=router

