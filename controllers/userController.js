var User = require('../dao/indexDAO').User;

exports.showPicUploadView = function(req, res) {
	res.render('upload', {
		title: '头像上传',
		user: req.session.user
	});
}

exports.uploadUserAvatar = function(req, res) {
	console.log('上传成功');
	res.redirect('/');
}