/*
    连接数据库jwc(因为18000人的学号身份证号姓名在这里..所以用的这个数据库)
*/
const mongoose = require('mongoose');
DBURL = 'mongodb://localhost:27017/dbexam';
mongoose.connect(DBURL);

mongoose.connection.on('connected', function() {
  console.log('neaulib Mongoose connection open to ' + DBURL);
});

mongoose.connection.on('error', function(err) {
  console.log('neaulib Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('neaulib Mongoose connection disconnected');
});

module.exports = mongoose;
