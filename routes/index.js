var request = require('request');
var path = require('path');
var fs = require('fs');

var login = require('../controllers/loginController');
var registor = require('../controllers/registorController');
var post = require('../controllers/postController');

var common = require('../modules/common');
// Test Code
// var defaultUrl = 'https://m.tianyi9.com/fo.php?live_id=KKXKPYZFOUCCQHOY&file_id=a1641fdf23a085a9&logincookie=';

module.exports = function(app) {
    /* GET home page. */
    app.get('/', post.showIndexview);

    app.get('/loginpwd', checkNotLogin);
    app.get('/loginpwd', login.showLoginPassword);

    app.post('/loginpwd', checkNotLogin);
    app.post('/loginpwd', login.passwordVerify);

    app.get('/login', checkNotLogin);
    app.get('/login', login.showLogin);

    // 判断用户是否在数据库中，如果是则发送获取密码
    app.post('/login', checkNotLogin);
    app.post('/login', login.loginGetPassword);

    app.get('/logout', checkLogin);
    app.get('/logout', login.logout);

    app.get('/reg', checkNotLogin);
    app.get('/reg', registor.showRegistor);

    app.post('/reg', checkNotLogin);
    app.post('/reg', registor.registInner);

    // app.get('/post', checkLogin);
    app.get('/post', post.showPostView);

    // app.post('/post', checkLogin);
    app.post('/post', post.postAnArticle);

    app.get('/u/:email', post.showUserAllPost);  // 显示单个用户的所有文章

    app.get('/p/:_id', post.showSinglePost);  // 显示一篇文章

    function checkLogin(req, res, next) {
        console.log('checkLogin');
        if (!req.session.user) {
            console.log('未登录');
            res.redirect('/login');
        }
        next();
    }

    function checkNotLogin(req, res, next) {
        console.log('checkNotLogin');
        if (req.session.user) {
            console.log('已登录');
            res.redirect('back');
        }
        next();
    }
}