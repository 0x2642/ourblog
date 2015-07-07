var User = require('../dao/indexDAO').User;

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

	//检查用户名是否已经存在 
	User.getUserByEmail(email, function(err, user) {
		if (err) {
			console.log('Get user error');
			return res.redirect('/reg');
		}
		if (user) {
			console.log('用户已存在');
			return res.redirect('/reg'); //返回注册页
		}
		//如果不存在则新增用户
		User.saveNewUser(email, nickName, about, signiture, lastLoginTime, function(err) {
			if (err) {
				console.log('aaaaa' + err);
				return res.redirect('/reg'); //注册失败返回主册页
			}
			//req.session.user = user; //用户信息存入 session
			console.log('registor success');
			res.redirect('/'); //注册成功后返回主页
		});
	});
}