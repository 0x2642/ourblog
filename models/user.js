/*
 * User model, 是否考虑加入base model需要验证
 */
var mongoose = require('mongoose');
// var BaseModel = require('./base_model');
var Schema = mongoose.Schema;

// 定义用户数据模型原型
var UserSchema = new Schema({
	email: {
		type: String // 用户邮箱
	},
	nickName: {
		type: String // 用户昵称
	},
	about: {
		type: String // 用户简介
	},
	signature: {
		type: String // 用户签名
	},
	lastLoginTime: {
		type: String, 
		default: Date.now
	}
	// create_at: {
	// 	type: Date,  // 用户创建时间
	// 	default: Date.now
	// },
	// update_at: {
	// 	type: Date,  // 用户更新时间
	// 	default: Date.now
	// },
	// avatar_url: {
	// 	type: String  // 用户头像外链地址
	// }
}, {
	collection: 'users'
});

// 引入basemodel
// UserSchema.plugin(BaseModel);

mongoose.model('User', UserSchema);