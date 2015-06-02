var mongodb = require('./db');

function User(user) {
	this.id = user.id;
	this.email = user.email;
	this.nickName = user.nickName;
	this.about = user.about;
	this.signiture = user.signiture;
	this.lastLoginTime = user.lastLoginTime;
}

module.exports = User;

User.getUser = function(email, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.findOne({
				email: email
			}, function(err, user) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				console.log(user);
				callback(null, user);
			})
		})
	})
}

User.prototype.save = function(callback) {
	//要存入数据库的用户信息
	var user = {
		id: this.id,
		email: this.email,
		nickName: this.nickName,
		about: this.about,
		signiture: this.signiture,
		lastLoginTime: this.lastLoginTime,
	};
	//打开数据库
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err); //错误，返回 err 信息
		}
		//读取 users 集合
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err); //错误，返回 err 信息
			}
			//将用户数据插入 users 集合
			collection.insert(user, {
				safe: true
			}, function(err, user) {
				mongodb.close();
				if (err) {
					return callback(err); //错误，返回 err 信息
				}
				callback(null, user[0]); //成功！err 为 null，并返回存储后的用户文档
			});
		});
	});
};