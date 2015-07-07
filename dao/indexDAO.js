/*
 * indexDAO为所有数据模型操作db的入口
 * 添加新模型方法：
 * 1 exports.XXX = require({path})
 * 2 添加xxxDAO.js文件 所有的数据与数据库操作都在dao中写
 */
exports.User = require('./userDAO');
exports.Post = require('./postDAO');