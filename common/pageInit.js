var pageParam = [];
var pageHeader =[];
var pageFooter =[];
var pageSider = [];

function setParams(targetObj, key, value) {
	targetObj[key] = value;
}

function setPageHeader() {
	setParams(pageHeader, 'title', 'Home');
	setParams(pageHeader, 'active', 'Home');
	pageHeader.extraStyles = new Array();
}

function setPageFooter() {
	pageFooter.extraScripts = new Array();
}

function setPageSider() {
	setParams(pageSider, 'aboutText', '<strong>0x2642 Blog</strong> is a blog about 教主爱加班教主爱加班');
	setParams(pageSider, 'aboutLink', '/about');
}

function setPageParam() {
	setParams(pageParam, 'pageTitle', '欢迎来到加班的世界');
	setParams(pageParam, 'pageDesc', '请到教主处领取加班单');
	setParams(pageParam, 'pageImage', 'images/bg.jpg');
}

exports.setViewInit = function() {
	setPageHeader();
	setPageFooter();
	setPageSider();
	setPageParam();
}

exports.getViewParams = function(){
	return {
		pageParam : pageParam,
		pageHeader: pageHeader,
		pageFooter: pageFooter,
		pageSider: pageSider
	}
}