var express = require('express');
var request = require('request');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var User = require('../models/user');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var settings = require('../settings');
var userId = 0;
// Test Code
// var defaultUrl = 'https://m.tianyi9.com/fo.php?live_id=KKXKPYZFOUCCQHOY&file_id=a1641fdf23a085a9&logincookie=';

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title: 'Yes sir Popesama\'s '
	});
});

router.get('/songjson', function(req, res) {
	res.render('songjson');
});

router.get('/download', function(req, res) {
	var filePath = path.join(__dirname, '../downloads/song.json');
	res.download(filePath);
});

router.get('/inputDrag', function(req, res) {
	res.render('inputDrag');
});

router.post('/songjson', function(req, res) {
	// Get url website
	var urlWebsite = req.body.urlname;
	var me = this;
	request(urlWebsite, function(err, response) {
		if (err) return err.stack;
		var jsonFile = response.body;
		var fileFolder = path.join(__dirname, '../downloads');
		var filePath = path.join(__dirname, '../downloads/song.json');

		function writeFile() {
			fs.writeFile(filePath, jsonFile, 'utf-8', function() {
				console.log('file write success');
				res.redirect('/download');
			});
		}

		// 判断文件夹是否存在
		fs.exists(fileFolder, function(exits) {
			console.log('exits: ' + exits);
			// 不存在则大建文件夹，再文件写入
			if (exits === false) {
				fs.mkdir(fileFolder, function() {
					writeFile();
				});
			} else {
				// 直接写入
				writeFile();
			}
		});
	});
});

router.get('/login', function(req, res) {
	res.render('login', {
		title: 'Login'
	})
});

router.get('/loginpwd', function(req, res) {
	res.render('loginpwd', {
		title: 'Login pwd'
	})
});

// 判断用户是否在数据库中，如果是则发送获取密码
router.post('/login', function(req, res) {
	console.log(req.body.email);
	var email = req.body.email;
	// Generate random password
	var password = Math.round(Math.random() * 8999) + 1000;
	console.log('password is :' + password);
	// mail configure
	var smtpConfig = settings.smtpConfig;

	User.getUser(email, function(err, user) {
		if (err) {
			console.log('can not get the user');
			res.redirect('/login');
		} else {
			function sendMail() {
				var transport = nodemailer.createTransport(smtpTransport(smtpConfig));
				transport.sendMail({
					from: ,
					to: email,
					subject: "Check your password",
					text: "your password is : " + password
				}, function(err, info){
					console.log("Send mail success");
				});
			}
			sendMail();
			res.redirect('/loginpwd');
		}
	})
});

router.get('/reg', function(req, res){
	res.render('reg', {
		title: "Registor test"
	})
});

router.post('/reg', function(req, res) {
	var email = req.body.email;
	var nickName = req.body.nickname;
	var signiture = req.body.signiture;
	var about = req.body.about;
	var lastLogin = new Date().getTime();

	// 创建新的用户
	var newUser = new User({
		id: userId,
		email: email,
		nickName: nickName,
		about: about,
		signiture: signiture,
		lastLoginTime: lastLogin
	});
	//检查用户名是否已经存在 
	User.getUser(email, function(err, user) {
		if (err) {
			console.log('Get user error');
			return res.redirect('/reg');
		}
		if (user) {
			console.log('用户已存在');
			return res.redirect('/reg'); //返回注册页
		}
		//如果不存在则新增用户
		newUser.save(function(err, user) {
			if (err) {
				console.log('aaaaa' + err);
				return res.redirect('/reg'); //注册失败返回主册页
			}
			req.session.user = user; //用户信息存入 session
			console.log('registor success');
			//感谢楼上的精彩装b 下一位
			userId++;
			res.redirect('/'); //注册成功后返回主页
		});
	});
});
module.exports = router;