

var config = require('../config');
var config_mail = require(config['mail_conf']);
var common = require('../modules/common');
var User = require('../models/user');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var Promise = require('promise');

exports.sendMail = function(email,data,tpl) {
		var from=config_mail[tpl]['from'];
		var subject=config_mail[tpl]['subject'];
		var text=config_mail[tpl]['text'];

		for(var key in data){
			text=text.replaceAll('{%'+key+'%}', data[key])
		}

		var ret = new Array(); 
		// 使用Promise解决发送邮件后跳转不能的错误
		var promise = new Promise(function(resolve, reject) {
		var transport = nodemailer.createTransport(smtpTransport(config_mail.mail_opt));

		transport.sendMail({
			from:from,
			to: email,
			subject: subject,
			text: text
		}, function(err, info) {
			if (err) {
				console.log(err);
				// 如果发送失败，返回发送页面
				ret['global_email'] = email;
				reject();
			} else {
				console.log("Send mail success");
				ret['global_email']  = email;
				resolve();
			}
		});
	});

	ret['promise']=promise;
	return ret;
}
