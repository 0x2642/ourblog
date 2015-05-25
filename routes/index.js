var express = require('express');
var request = require('request');
var path = require('path');
var fs = require('fs');
var router = express.Router();
// Test Code
// var defaultUrl = 'https://m.tianyi9.com/fo.php?live_id=KKXKPYZFOUCCQHOY&file_id=a1641fdf23a085a9&logincookie=';

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title: 'Yes sir Popesama\'s '
	});
});

router.get('/songjson', function(req, res) {
	res.render('songjson');
});

router.get('/download', function(req, res) {
	var filePath = path.join(__dirname, '../downloads/song.json');
	res.download(filePath);
});

router.get('/inputDrag', function(req, res) {
	res.render('inputDrag');
});

router.post('/songjson', function(req, res) {
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


module.exports = router;