var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Article = mongoose.model('Article')

module.exports = {
	logout: function(req, res) {
		req.logout();
		res.json({msg:'ok'});
	},
	create: function(req, res) {

	},
	verify: function(req, res) {

	},
	login: function(req, res) {

	},
	list: function(req, res) {
		res.json({msg:'ok'});
	}
}