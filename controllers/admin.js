var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , ShortUrl = mongoose.model('ShortUrl');

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
	shortened: function(req, res, next) {
		ShortUrl.findOne({hash:req.param('hash')}, function(err, url) {
			if(err) return next(err);
			res.redirect(url.destination);
		});
	}
}