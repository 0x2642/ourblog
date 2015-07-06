var common = require('../modules/common');
var mongoose = require('mongoose');

var postSchame = new mongoose.Schema({
	// id: Number,
	poster: String,
	title: String,
	// visitCount: Number,
	contents: String,
	createTime: Date,
	// status: Number,
	// tags:Number
}, {
	collection: 'posts'
});

var postModel = mongoose.model('Post', postSchame);

function Post(poster, title, contents) {
	this.poster = poster;
	this.title = title;
	this.contents = contents;
}

Post.prototype.save = function(callback) {
	var date = new Date();
	var post = {
		poster: this.poster,
		title: this.title,
		contents: this.contents,
		createTime: date.getTime()
	}

	var newPost = new postModel(post);
	common.pt('init finish postModel');
	newPost.save(function(err, post) {
		if (err) {
			return err.stack;
		}
		callback(null, post);
	})
}

Post.getAllPosts = function(callback) {
	postModel.find({}, function(err, posts) {
		if (err) {
			console.log('mongoose get posts error');
			return err.stack;
		}
		callback(null, posts);
	});
}

/**
 * 根据关键词，获取文章列表
 * Callback:
 * - err, 数据库错误
 * - posts, 文章列表
 * @param {String} query 搜索关键词
 * @param {Object} option 搜索选项
 * @param {Function} callback 回调函数
 */
Post.getPostsByQuery = function(query, option, callback) {
	postModel.find(query, {}, option, function(err, posts) {
		if (err) {
			return callback(err);
		}
		if (posts.length === 0) {
			return callback(null, []);
		}
		callback(null, posts);
	}).sort({
		'_id': -1
	});
}

module.exports = Post;