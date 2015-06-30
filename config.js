var config = {

	// 邮箱配置
	mail_opt: {
		host: 'smtp.163.com',
		port: 25,
		auth: {
			user: "ourblog_test@163.com",
			pass: "iwnhqunluvahwzsf"
		}
	},

	mail_info: {
		from: "ourblog_test@163.com",
		subject: "Check your password",
		text: "your password is : "
	},

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