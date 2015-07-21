var tool = require('../common/tool');

module.exports = function(schema) {
	schema.method.create_at_ago = function() {
		return tool.formatDate(this.create_at, true);
	}
	schema.method.update_at_ago = function() {
		return tool.formatDate(this.update_at, true);
	}
}