var global_password;
var global_email;

var User = require('../dao/indexDAO').User;
var validator = require('validator');
var eventproxy = require('eventproxy');
var mail = require('../common/mail');
var page = require('../common/pageInit');

function _generatePassword() {
	var password = Math.round(Math.random() * 8999) + 1000;
	global_password = password;
}

function _getPassword() {
	return global_password;
}

function _getEmail() {
	return global_email;
}

// 发送给用户密码邮件
function _sendMail(email) {
	var data = new Array();
	data['password'] = _getPassword();
	var tpl = 'login_mail';
	var ret = mail.sendMail(email, data, tpl);
	return ret['promise'];
}

exports.showLogin = function(req, res) {
	page.setViewInit();
	var params = page.getViewParams();
	res.render('login', {
		pageParam: params.pageParam,
		pageHeader: params.pageHeader,
		pageSider: params.pageSider,
		pageFooter: params.pageFooter,
		user: req.session.user,
		error_msg: null
	});
}

exports.showLoginPassword = function(req, res) {
	page.setViewInit();
	var params = page.getViewParams();

	res.render('loginpwd', {
		pageParam: params.pageParam,
		pageHeader: params.pageHeader,
		pageSider: params.pageSider,
		pageFooter: params.pageFooter,
		user: req.session.user,
	});
}

exports.loginGetPassword = function(req, res) {
	var email = validator.trim(req.body.email).toLowerCase();
	var params = page.getViewParams();
	var ep = new eventproxy();

	page.setViewInit();

	ep.on('login_fail', function(msg) {
		res.status(422);
		res.render('login', {
			pageParam: params.pageParam,
			pageHeader: params.pageHeader,
			pageSider: params.pageSider,
			pageFooter: params.pageFooter,
			user: req.session.user,
			error_msg: msg
		})
	});

	// 输入的是否为邮箱
	if (validator.isEmail(email)) {
		// 产生密码
		_generatePassword();
		// 进入DB查找用户是否存在
		User.getUserByEmail(email, function(err, user) {
			if (err) {
				ep.emit('login_fail', '取不到User数据');
			} else {
				// 如果用户存在
				if (user !== null) {
					_sendMail(email).then(function(mail) {
						// 发送成功后的动作
						global_email = mail;
						res.redirect('/loginpwd');
					}).catch(function() {
						// 发送失败后的动作
						ep.emit('login_fail', '邮件发送失败');
						// test code:
						// res.redirect('/loginpwd');
					});
				} else {
					ep.emit('login_fail', '你tm不是我们组织的');
				}
			}
		})
	} else {
		ep.emit('login_fail', '输入的不是邮箱');
	}
}

exports.passwordVerify = function(req, res) {
	var inputpwd = parseInt(req.body.password);
	var password = _getPassword();
	var email = _getEmail();

	if (inputpwd === password) {
		console.log('====== Verify Success =====');
		User.getUserByEmail(email, function(err, user){
			if (err) {
				console.error('db get error');
				return res.redirect('/');
			}
			req.session.user = user;
			res.redirect('/');
		})
	} else {
		console.log('password error');
		res.redirect('/loginpwd');
	}
}

exports.logout = function(req, res) {
	req.session.user = null;
	// res.redirect('/');
}