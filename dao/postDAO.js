var PostModel = require('../models/index').Post;

/**
 * 根据关键词，获取文章列表
 * Callback:
 * - err, 数据库错误
 * - posts, 文章列表
 * @param {String} query 搜索关键词
 * @param {Object} option 搜索选项
 * @param {Function} callback 回调函数
 */
exports.getPostsByQuery = function(query, option, callback) {
	PostModel.find(query, {}, option, function(err, posts) {
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

/**
 * 文章存入数据库
 * @param {String} poster 作者
 * @param {String} title 文章标题
 * @param {String} contents 文章内容
 * @param {Date} createTime 创建时间 
 * @param {Function} callback 回调函数
 */
exports.saveNewPost = function(poster, title, contents, createTime, callback) {
	var postModel = new PostModel();
	postModel.poster = poster;
	postModel.title = title;
	postModel.contents = contents;
	postModel.createTime = createTime;

	postModel.save(callback);
}

/**
 * 根据用户Email获取用户所有文章列表
 * Callback:
 * - err, 数据库错误
 * - posts, 该用户的所有文章列表
 * @param {String} email email用户所有的文章
 * @param {Function} callback 回调函数
 */
exports.getPostsByEmail = function(email, callback) {
	// 异常Case考虑：如果不存在email, 则返回空
	if (!email) {
		callback(null, null);
	} else {
		PostModel.find({
			poster: email
		}, function(err, posts) {
			if (err) {
				return callback(err);
			}
			if (!posts) {
				return callback(err, null);
			}
			callback(null, posts);
		});
	}
}

/**
 * 根据id来寻找一篇文章
 * Callback:
 * - err, 数据库错误
 * - post, 匹配到的文章
 * @param {String} id 文章的id
 * @param {Function} callback 回调函数
 */
exports.getSinglePostById = function(id, callback) {
	if (!id) {
		callback(null, null);
	} else {
		PostModel.findOne({
			_id: id
		}, function(err, post) {
			if (err) {
				callback(err);
			} else {
				callback(null, post);
			}
		})
	}
}

/**
 * 修改一篇文章
 * Callback:
 * - err, 数据库错误
 * @param {String} newTitle 文章的新title
 * @param {String} newContents 文章的新newContents
 * @param {Function} callback 回调函数
 */
exports.updatePostById = function(id, newTitle, newContents, callback) {
	PostModel.findOne({
		_id: id
	}, function(err, post) {
		if (err) {
			callback(err);
		}

		post.title = newTitle;
		post.contents = newContents;

		post.save(function(err) {
			if (err) {
				callback(err);
			} else {
				callback(null);
			}
		});
	});
}