var mongoose = require('mongoose');
var mongoURL = require('../settings').mongodbUrl;
// 程序启动后通过mongoose进行连接db的操作
mongoose.connect(mongoURL);
// 连接db成功时
mongoose.connection.on('connected', function () {
     console.log('Mongoose connected to ' + mongoURL);
});
// 连接db出错时
mongoose.connection.on('error',function (err) {
      console.log('Mongoose connection error: ' + err);
});
// db失去连接 
mongoose.connection.on('disconnected', function () {
      console.log('Mongoose disconnected');
});
//程序终止后断开
process.on('SIGNIT', function(){
    mongoose.connection.close(function(){
        console.log('db connection is off');
    })
    process.exit(0);
});