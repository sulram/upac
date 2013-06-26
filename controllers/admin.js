var mongoose = require('mongoose')
  , User = mongoose.model('User');

module.exports = {
	signin: function(req, res, next) {
		res.render('admin/login');
	},
	login: function(req, res, next) {
		res.redirect('/admin');
	},
	logout: function(req, res, next) {
		req.logout();
		res.redirect('/');
	}
}