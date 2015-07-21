// test
exports.test = function(req, res) {
	console.log('test');
}

exports.pt = function(text) {
	console.log(text);
}

String.prototype.replaceAll = function(s1,s2) { 
    return this.replace(new RegExp(s1,"gm"),s2); 
}

exports.strip_tags =function(str)
{
return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
}