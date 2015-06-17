var mongoose = require('mongoose');
var settings = require('../settings');

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
	newPost.save(function(err, post) {
		if (err) {
			return err.stack;
		}
		callback(null, post);
	})
}

Post.getOne = function(poster, callback) {
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


module.exports = Post;