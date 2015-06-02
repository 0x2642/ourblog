var settings = require('../settings'),
	Db = require('mongodb').Db,
	Connection = require('mongodb').Connection,
	Server = require('mongodb').Server;

var server = new Server(settings.host, settings.port),
	db = new Db(settings.db, server, {
		safe: true
	});

module.exports = db;