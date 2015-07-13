var config_mail={
	// 邮箱配置
	mail_opt: {
		host: 'smtp.163.com',
		port: 25,
		auth: {
			user: "ourblog_test@163.com",
			pass: "iwnhqunluvahwzsf"
		}
	},
	login_mail: {
		from: "ourblog_test@163.com",
		subject: "Check your password",
		text: "your password is : {%password%}"
	},
}

module.exports = config_mail;