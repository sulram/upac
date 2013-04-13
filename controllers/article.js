var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Article = mongoose.model('Article')

module.exports = {
	index: function(req, res) {
		var from = req.param('from') || 0;
		var limit = req.param('per_page') || 10;
		var sortby = req.param('sort_by') || null;
		var order = req.param('order') || 1;
		var query = Article.find({});
		if(sortby) {
			var qobj = {};
			qobj[sortby] = order;
			query.sort(sortby, order);
		}
		query.skip(from).limit(limit);
		query.exec(function(err, articles) {
			if (err) return next(err);
			res.json({
				msg:'ok',
				articles: articles,
				from: from,
				sort_by: sortby,
				order: order
			});
		});

	},
	create: function(req, res) {
		var article = new Article(req.data);
		article.owner.push(req.user.id);
		res.json({msg:'ok'});
	},
	show: function(req, res, next) {
		Article.findById(req.params.id, function(err, article){
			if(err) return next(err);
			if(!article) return res.json(404, {error: 'article not found'});
			res.json({article:{
				title: article.title,
				content: article.content,
				owners: article.owners,
				slug: article.slug
			}});
		});
	},
	update: function(req, res) {
		var article = Article.findById()
	},
	remove: function(req, res, next) {
		Article.remove({_id: id})
	},
	bySlug: function(req, res, next) {
		Article.findOne({slug:req.param('slug')}, function(err, article) {
			if(err) return next(err);
			if(!article) return res.json(404, {msg: "article not found"});
			res.json({
				msg:'ok',
				article: article,
			});
		});
	},
	byUser: function(req, res, next) {
		User.findOne({username:req.param('username')},function(err, user) {
			if(err) return next(err);
			if(!user) return res.json(404, {msg: "user not found"});
			Article.find({owners:user.id}, function(err, articles) {
				if(err) return next(err);
				if(!articles) return res.json(404, {msg: "no articles found"});
				res.json({
					msg:'ok',
					articles: articles
				});
			});

		});
	}
}