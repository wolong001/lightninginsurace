const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const moment = require('moment');
const cookieParser = require('cookie-parser');
const fs = require('fs')
const PORT = process.env.port || 8000;
const config = require('./config/database');
const routes = require('./routers')


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./frontend/build")));


// To-Do: Import Routers

(function main() {
  
  // Set up my mongoDB
  //mongoose.connect(config.database);
  //mongoose.connection.on('connected', () => {
  //  console.log('MongoDB has started.');
  //});
  //mongoose.connection.on('error', (err) => {
  //  console.log('Database error' + err);
  //});

  // Set up time module
  moment.locale('zh-cn');

  //To-Do: add routers
 

  // Start Web Server Listening
  app.listen(PORT, () => {
    console.log('Server Started on Port ' + PORT);
  });

})();

module.exports = app;