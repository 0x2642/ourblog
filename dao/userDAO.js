var UserModel = require('../models/index').User;

exports.getUserByEmail = function(email, callback) {
	UserModel.findOne({
		email: email
	}, function(err, user) {
		if (err) {
			return callback(err);
		}
		callback(null, user);
	})
}

exports.saveNewUser = function(email, nickName, about, signature, lastLoginTime, callback){
	var user = new UserModel();
	user.email = email;
	user.nickName = nickName;
	user.about = about;
	user.signature = signature;
	user.lastLoginTime = lastLoginTime;

	user.save(callback);
}