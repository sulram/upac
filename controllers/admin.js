var mongoose = require('mongoose')
  , _ = require('underscore')
  , User = mongoose.model('User')
  , Article = mongoose.model('Article')
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
	},
	generate_shorturls: function(req, res, next) {
		Article.find({},function(err, articles) {
			if(err) return next(err);
			_.each(articles, function(article) {
				ShortUrl.findOne({object:article._id}, function(err, shorturl) {
					if(err) return next(err);
					if(!shorturl) {
						ShortUrl.makeShortUrl(article._id, article.createdAt, '/#/blog/post/'+article._id.toString(), function(err){});
					}
				})
			})
			res.jsonx({msg:'generating'});
		})
	}
}