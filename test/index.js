var port = require('../bin/www').port;
var superagent = require('superagent');
var expect = require('expect.js');

describe('ourblog unit case test', function() {
	
	describe('get index page', function() {
		it('response to Get', function(done) {
			superagent.get('http://localhost:' + port).end(function(err, res) {
				console.log('aaaaaaaa');
				expect(err).to.equal(null);
				expect(res.status).to.equal(200);
				done();
			})
		})
	});

	describe('get login page', function() {
		it('response to Get', function(done) {
			superagent.get('http://localhost:' + port).end(function(err, res) {
				expect(err).to.equal(null);
				expect(res.status).to.equal(200);
				done();
			});
		})
	});
});

