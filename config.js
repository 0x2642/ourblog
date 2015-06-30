var config = {

	mail_conf: "../configure/mail.js",


	// 远程db地址
	dbUrl: "mongodb://ourblog:111111@ds029317.mongolab.com:29317/ourblog",

	// 是否只允许
	allow_sign_up: true, 

	cookieSecrete: 'ourblog',

	// 默认为开发模式
	debug: true,

	// session 配置
	session_secret: 'ourblog'
}

module.exports = config;