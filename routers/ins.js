const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/user');
const InsOrder = require('../models/insorder');
const config = require('../config/database');
const moment = require('moment');

router.post('/purchase', (req, res, next) => {
  const userid = req.body.userid;
  const typeid = req.body.typeid;
  const copies = req.body.copies;

  let newOrder = new InsOrder({
    userid: userid, insid: typeid,
    copies: copies, status: 1,
    msg: ''
  });

  User.getUserById(thatuser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'user error: ' + err});
    } else {
      InsOrder.getTypeById(thatins, (err, instype) => {
        if(err) {
          res.json({success: false, msg: 'insurance type error: ' + err});
        } else {
          if(thatuser.balance < thatins.boughtprice) {
            res.json({success: false, msg: 'user don\'t have enough money!'});
          } else {
            InsOrder.addOrder(newOrder, (err, suc) => {
              if(err) {
                res.json({success: false, msg: 'InsOrder add failed.'});
              } else {
                res.json({success: true, msg: 'InsOrder add successfully!'});
              }
            });
          }
        }
      });
    }
  });

});

router.get('/claim', (req, res, next) => {
  const orderid = req.body.orderid;
  const photo = req.body.photo;

  let newStatus = 2;
  InsOrder.updateOrder(orderid, newStatus);

  if(InsOrder.checkClaim()) {
    newStatus = 4;
    InsOrder.updateOrder(orderid, newStatus);
  } else {
    newStatus = 3;
    InsOrder.updateOrder(orderid, newStatus);
  }

});

