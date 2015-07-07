/*
 * Post model, 是否考虑加入base model需要验证
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchame = new Schema({
	poster: {
		type: String // 文章作者
	},
	title: {
		type: String  // 文章标题
	},
	// visitCount: Number,
	contents: {
		type: String  // 
	},
	createTime: {
		type: String,
		default: Date.now
	}
	// status: Number,
	// tags:Number
}, {
	collection: 'posts'
});

mongoose.model('Post', PostSchame);