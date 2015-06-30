// 初始化userId
var userId = 0;
var User = require('../models/user');

exports.showRegistor = function(req, res) {
	res.render('reg', {
		title: "Registor test",
		user: req.session.user
	});
}

exports.registInner = function(req, res) {
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
			//req.session.user = user; //用户信息存入 session
			console.log('registor success');
			//感谢楼上的精彩装b 下一位
			userId++;
			res.redirect('/'); //注册成功后返回主页
		});
	});
}