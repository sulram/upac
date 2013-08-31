/***********************
 * UPAC
 * Administration login/logout controller
 ***********************/

var mongoose = require('mongoose')
  , User = mongoose.model('User');
  
module.exports = {
	signin: function(req, res, next) {
		res.render('admin/login');
	},
	login: function(req, res, next) {
		req.session.cookie.expires = false;
		res.redirect('/admin');
	},
	logout: function(req, res, next) {
		req.session.cookie.expires = new Date(Date.now()+48*60*60*1000);
		req.logout();
		res.redirect('/');
	},
}