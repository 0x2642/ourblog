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

Post.get = function(poster, callback) {
	//var postsModify = new Array();

	poster = "515310301@qq.com";
	postModel.find({
		poster: poster
	}, function(err, posts) {
		if (err) {
			return err.stack;
		}
		callback(null, posts);
	})
}

Post.getAllPosts = function(callback) {
	postModel.find({}, function(err, posts){
		if (err) {
			console.log('mongoose get posts error');
			return err.stack;
		}
		callback(null, posts);
	});
}

module.exports = Post;