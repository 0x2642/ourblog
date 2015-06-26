var request = require('request');
var path = require('path');
var fs = require('fs');
var User = require('../models/user');
var Post = require('../models/post');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var settings = require('../settings');
// 用户id
var userId = 0;
var pwd = 0;
var glEmail = null;
// Test Code
// var defaultUrl = 'https://m.tianyi9.com/fo.php?live_id=KKXKPYZFOUCCQHOY&file_id=a1641fdf23a085a9&logincookie=';

module.exports = function(app) {
    /* GET home page. */
    app.get('/', function(req, res) {
        Post.getAllPosts(function(err, posts) {
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
    app.get('/loginpwd', function(req, res) {
        res.render('loginpwd', {
            title: 'Login pwd',
            user: req.session.user
        })
    });

    app.post('/loginpwd', checkNotLogin);
    app.post('/loginpwd', function(req, res) {
        var inputpwd = parseInt(req.body.password);
        var passwd = pwd;
        var email = glEmail;

        console.log('email: ' + email);

        if (inputpwd === passwd) {
            console.log('Login successful');
            User.getUser(email, function(err, user) {
                if (err) {
                    // 返回一个没有登录的index
                    res.redirect('/');
                    return err;
                }
                console.log('user nickname is: ', user.nickName);
                req.session.user = user;
                // 返回一个登录了的index
                res.redirect('/');
            })
        } else {
            console.log('password error');
            res.redirect('/loginpwd');
        }
    });

    app.get('/login', checkNotLogin);
    app.get('/login', function(req, res) {
        res.render('login', {
            title: 'Login',
            user: req.session.user
        })
    });

    // 判断用户是否在数据库中，如果是则发送获取密码
    app.post('/login', checkNotLogin);
    app.post('/login', function(req, res) {
        console.log(req.body.email);
        var email = req.body.email;
        // Generate random password
        var password = Math.round(Math.random() * 8999) + 1000;
        console.log('password is :' + password);
        pwd = password;
        console.log('global pwd :' + password);
        // mail configure
        var smtpConfig = settings.smtpConfig;
        console.log(smtpConfig);
        var me = this;

        User.getUser(email, function(err, user) {
            if (err) {
                console.log('can not get the user');
                res.redirect('/login');
            } else {
                // 如果用户存在
                if (user !== null) {
                    function sendMail() {
                        var transport = nodemailer.createTransport(smtpTransport(smtpConfig));
                        transport.sendMail({
                            from: "ourblog_test@163.com",
                            to: email,
                            subject: "Check your password",
                            text: "your password is : " + password
                        }, function(err, info) {
                            if (err) {
                                console.log(err);
                                // 如果发送失败，返回发送页面
                                glEmail = email;
                                res.redirect('/loginpwd');
                            } else {
                                console.log("Send mail success");
                                glEmail = email;
                                res.redirect('/loginpwd');
                            }
                        });
                    }
                    sendMail();
                } else {
                    res.redirect('/login');
                }
            }
        })
    });

    app.get('/reg', checkNotLogin);
    app.get('/reg', function(req, res) {
        res.render('reg', {
            title: "Registor test",
            user: req.session.user
        })
    });

    app.post('/reg', checkNotLogin);
    app.post('/reg', function(req, res) {
        var email = req.body.email;
        var nickName = req.body.nickname;
        var signiture = req.body.signiture;
        var about = req.body.about;
        var lastLogin = new Date().getTime();

        // 创建新的用户
        var newUser = new User({
            id: userId,
            email: email,
            nickName: nickName,
            about: about,
            signiture: signiture,
            lastLoginTime: lastLogin
        });
        //检查用户名是否已经存在 
        User.getUser(email, function(err, user) {
            if (err) {
                console.log('Get user error');
                return res.redirect('/reg');
            }
            if (user) {
                console.log('用户已存在');
                return res.redirect('/reg'); //返回注册页
            }
            //如果不存在则新增用户
            newUser.save(function(err, user) {
                if (err) {
                    console.log('aaaaa' + err);
                    return res.redirect('/reg'); //注册失败返回主册页
                }
                //req.session.user = user; //用户信息存入 session
                console.log('registor success');
                //感谢楼上的精彩装b 下一位
                userId++;
                res.redirect('/'); //注册成功后返回主页
            });
        });
    });

    app.get('/logout', checkLogin);
    app.get('/logout', function(req, res) {
        req.session.user = null;
        res.redirect('/');
    });

    // app.get('/post', checkLogin);
    app.get('/post', function(req, res) {
        res.render('post', {
            title: "post title",
            user: req.session.user
        })
    });

    // app.post('/post', checkLogin);
    app.post('/post', function(req, res) {
        var currentUser = req.session.user;
        var postTitle = req.mce_1;
        var postContext = req.mce_2;

        if (!currentUser) {
            emailStr = '515310301@qq.com';
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