var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Article = mongoose.model('Article')
  , Img = mongoose.model('Img')
  , Attachment = mongoose.model('Attachment')

module.exports = function(cdn){ return {
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
			res.jsonx({
				msg:'ok',
				articles: articles,
				from: from,
				sort_by: sortby,
				order: order
			});
		});

	},
	create: function(req, res, next) {
		var article = new Article(req.data);
		article.owners.push(req.user.id);
		article.save(function(err) {
			if (err) return next(err);
			res.jsonx({
				msg:'ok',
				article: article
			});
		});
	},
	show: function(req, res, next) {
		Article.findById(req.params.id, function(err, article){
			if(err) return next(err);
			if(!article) return res.jsonx(404, {error: 'article not found'});
			res.jsonx({article:{
				title: article.title,
				content: article.content,
				owners: article.owners,
				slug: article.slug
			}});
		});
	},
	update: function(req, res) {
		var article = Article.findById(req.param('id'), function(err, article) {
			if(err) return next(err);
			if(!article) return res.jsonx(404, {error: 'article not found'});
			article.updateAt = new Date();
			article.save(function(err) {
				if (err) return res.jsonx(500, {error: 'internal server error'});
				res.jsonx({
					msg: 'ok',
					article: article,
				});
			});
		});
	},
	remove: function(req, res, next) {
		Article.remove({_id: id})
	},
	bySlug: function(req, res, next) {
		Article.findOne({slug:req.param('slug')}, function(err, article) {
			if(err) return next(err);
			if(!article) return res.jsonx(404, {msg: "article not found"});
			res.jsonx({
				msg:'ok',
				article: article,
			});
		});
	},
	byUser: function(req, res, next) {
		User.findOne({username:req.param('username')},function(err, user) {
			if(err) return next(err);
			if(!user) return res.jsonx(404, {msg: "user not found"});
			Article.find({owners:user.id}, function(err, articles) {
				if(err) return next(err);
				if(!articles) return res.jsonx(404, {msg: "no articles found"});
				res.jsonx({
					msg:'ok',
					articles: articles
				});
			});

		});
	},
	uploadImage: function(req, res, next) {
		Article.findById(req.param('article_id'), function(err, article){
			if(err) return next(err);
			if(!article) return res.jsonx(404, {msg: "article not found"});
			var img = new Img();
			cdn.upload()

			img.save();
			article.images.push(img.id);
			article.save(function(err){
				if (err) return res.jsonx(500, {msg: "error saving image"});
				res.jsonx({msg:"ok", image:img});
			});
		});
	},
	uploadAttachment: function(req, res, next) {
		Article.findById(req.param('article_id'), function(err, article){
			if(err) return next(err);
			if(!article) return res.jsonx(404, {msg: "article not found"});
			var attachment = new Attachment();
			cdn.upload()

			attachment.save();
			article.attachments.push(attachment.id);
			article.save(function(err){
				if (err) return res.jsonx(500, {msg: "error saving image"});
				res.jsonx({msg:"ok", image:img});
			});
		});
	}
}};