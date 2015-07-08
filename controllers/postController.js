var Post = require('../dao/indexDAO').Post;
var User = require('../dao/indexDAO').User;

exports.showIndexview = function(req, res) {
	// 可以自定义文章查询显示个数
	var opt = {
		limit: 5
	};

	Post.getPostsByQuery(null, opt, function(err, posts) {
		if (err) {
			posts = [];
		}
		res.render('index', {
			title: 'Yes sir Popesama\'s ',
			user: req.session.user,
			posts: posts
		});
	});
}

exports.showPostView = function(req, res) {
	if (!req.session.user) {
		res.redirect('/');
	}
	res.render('post', {
		title: "post title",
		user: req.session.user
	});
}

exports.showUserAllPost = function(req, res) {
	var email = req.params.email;
	
	User.getUserByEmail(email, function(err, user) {
		if (!user) {
			console.log('User is not found');
			return res.redirect('/');
		}
		Post.getPostsByEmail(email, function(err, posts) {
			if (err) {
				console.log(err.stack);
				res.redirct('/');
			} else {
				res.render('user', {
					title: 'user', 
					user: req.session.user,
					posts: posts
				});
			}
		});
	});
}

exports.showSinglePost = function(req, res) {
	Post.getSinglePostById(req.params._id, function(err, post){
		if (err) {
			return res.redirect('/');
		}
		res.render('article', {
			title: post.title,
			post: post,
			user: req.session.user
		})
	})
}

exports.postAnArticle = function(req, res) {
	var currentUser = req.session.user;
	var postTitle = req.body.mce_1;
	var postContext = req.body.mce_2;

	if (!currentUser) {
		res.redirect('/');
	} else {
		emailStr = currentUser.email;
	}

	var date = new Date();
	
	Post.saveNewPost(emailStr, postTitle, postContext, date.getTime(), function(err) {
		if (err) {
			console.error('=========== save post error ==============');
			res.redirect('/');
		} else {
			console.log('=========== save post success ==============');
			res.redirect('/');
		}
	})
}