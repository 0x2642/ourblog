var request = require('request');
var path = require('path');
var fs = require('fs');
var User = require('../models/user');
var Post = require('../models/post');
var login = require('../controllers/loginController');
var registor = require('../controllers/registorController');
var common = require('../modules/common');
// Test Code
// var defaultUrl = 'https://m.tianyi9.com/fo.php?live_id=KKXKPYZFOUCCQHOY&file_id=a1641fdf23a085a9&logincookie=';

module.exports = function(app) {
    /* GET home page. */
    app.get('/', function(req, res) {

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
    });

    app.get('/songjson', function(req, res) {
        res.render('songjson', {
            title: 'Song json transfer'
        });
    });

    app.get('/download', function(req, res) {
        var filePath = path.join(__dirname, '../downloads/song.json');
        res.download(filePath);
    });

    app.get('/inputDrag', function(req, res) {
        res.render('inputDrag', {
            title: 'input drag'
        });
    });

    app.post('/songjson', function(req, res) {
        // Get url website
        var urlWebsite = req.body.urlname;
        var me = this;
        request(urlWebsite, function(err, response) {
            if (err) return err.stack;
            var jsonFile = response.body;
            var fileFolder = path.join(__dirname, '../downloads');
            var filePath = path.join(__dirname, '../downloads/song.json');

            function writeFile() {
                fs.writeFile(filePath, jsonFile, 'utf-8', function() {
                    console.log('file write success');
                    res.redirect('/download');
                });
            }

            // 判断文件夹是否存在
            fs.exists(fileFolder, function(exits) {
                console.log('exits: ' + exits);
                // 不存在则大建文件夹，再文件写入
                if (exits === false) {
                    fs.mkdir(fileFolder, function() {
                        writeFile();
                    });
                } else {
                    // 直接写入
                    writeFile();
                }
            });
        });
    });

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
    app.get('/post', function(req, res) {
        if (!req.session.user) {
            res.redirect('/');
        }
        res.render('post', {
            title: "post title",
            user: req.session.user
        })
    });

    // app.post('/post', checkLogin);
    app.post('/post', function(req, res) {
        var currentUser = req.session.user;
        var postTitle = req.body.mce_1;
        var postContext = req.body.mce_2;

        if (!currentUser) {
            res.redirect('/');
        } else {
            emailStr = currentUser.email;
        }
        var newPost = new Post(emailStr, postTitle, postContext);

        newPost.save(function(err) {
            if (err) {
                console.error('=========== save post error ==============');
                res.redirect('/');
            } else {
                console.log('=========== save post success ==============');
                res.redirect('/');
            }
        });
    });

    // 未完工
    // app.get('/u/:email', function(req, res) {
    //     User.getUser(req.params.email, function(err, user) {
    //         if (err) {
    //             console.log('can\'t find the user');
    //             return res.redirect('/');
    //         }
    //         Post.getAllPost(req.params.email, function(err, posts) {
    //             if (err) {
    //                 console.log('Fetch posts error');
    //                 return res.redirect('/');
    //             }
    //             res.render('user', {
    //                 poster: user.nickName,
    //                 post: posts,
    //                 user: req.session.user
    //             })
    //         })
    //     })
    // });

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