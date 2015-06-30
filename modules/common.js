// test
exports.test = function(req, res) {
	console.log('test');
}

String.prototype.replaceAll = function(s1,s2) { 
    return this.replace(new RegExp(s1,"gm"),s2); 
}