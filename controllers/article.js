var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Article = mongoose.model('Article')
  , Img = mongoose.model('Img')
  , Attachment = mongoose.model('Attachment')
  , fs = require('fs')

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
	preloadById: function(req, res, next) {
		var article = Article.findById(req.param('id'), function(err, article) {
			if(err) return next(err);
			if(!article) return res.jsonx(404, {error: 'article not found'});
			req.article = article;
			next();
		});
	},
	update: function(req, res) {
		req.article.updateAt = new Date();
		req.article.save(function(err) {
			if (err) return res.jsonx(500, {error: 'internal server error'});
			res.jsonx({
				msg: 'ok',
				article: article,
			});
		});
	},
	remove: function(req, res, next) {
		Article.remove({_id: id},function(err){
			if (err) {
				res.jflash('error', 'internal server error');
				return res.jsonx(500, {msg:'internal server error'});
			}
			res.jsonx({
				msg: 'ok',
			})
		});
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
		Article.findById(req.param('id'), function(err, article){
			if(err) return next(err);
			if(!article) return res.jsonx(404, {msg: "article not found"});
			var img = new Img();
			var path = req.files.image.name;
			img.filename = path.split('/').slice(-2).join('/');
			img.remote_name = 'article-'+article.id+'/images/'+img.filename;
			cdn.create().upload({
				container: cdn.container,
				remote: img.remote_name,
				local: req.files.image.path // <-- image = name do item no form de upload
			},function(err) {
				if (err) return next(err);
				img.save();
				article.images.push(img.id);
				article.save(function(err){
					if (err) return res.jsonx(500, {msg: "error saving image"});
					res.jsonx({msg:"ok", image:img});
				});
			});

		});
	},
	uploadAttachment: function(req, res, next) {
		Article.findById(req.param('id'), function(err, article){
			if(err) return next(err);
			if(!article) return res.jsonx(404, {msg: "article not found"});
			var attachment = new Attachment();
			var path = req.files.upload.name;
			attachment.filename = path.split('/').slice(-2).join('/');
			attachment.remote_name = 'article-'+article.id+'/attachments/'+attachment.filename;
			cdn.create().upload({
				container:cdn.container,
				remote: attachment.remote_name,
				local: req.files.attachment.path// <-- attachment = name do item no form de upload
			}, function(err) {
				if (err) return next(err);
				attachment.save();
				article.attachments.push(attachment.id);
				article.save(function(err){
					if (err) return res.jsonx(500, {msg: "error saving image"});
					res.jsonx({msg:"ok", image:img});
				});

			});
		});
	},
	getImages: function(req, res, next) {
		Article.findById(req.param('id')), function(err, article) {
			if (err) return next(err);
			if (!article) return res.jsonx(404, {msg: "article not found"});
			Img.find({_id:article.images}, function(err, images) {
				if (err) return next(err);
				if (!images) return res.jsonx({images:[]});
				res.jsonx({attachments: _.map(article.attachments, function(attachment){
					attachment.remote_name = cdn.server_url+attachment.remote_name;
					return attachment;
				})});
			});
		}
	},
	getAttachments: function(req, res, next) {
		Article.findById(req.param('id')), function(err, article) {
			if (err) return next(err);
			if (!article) return res.jsonx(404, {msg: "article not found"});
			Attachment.find({_id:article.attachments}, function(err, attachments){
				if (err) return next(err);
				if (!attachments) return res.jsonx({attachments:[]});
				res.jsonx({attachments: _.map(attachments, function(attachment){
					attachment.remote_name = cdn.server_url+attachment.remote_name;
					return attachment;
				})});
			});
		}
	}

	/*
	// route for testing uploads to the CDN server
	uploadTest: function(req, res, next) {
		//console.log(req.files);
		var path = req.files.uploadImage.name;
		//console.log('path -> '+path);
		var filename = path.split('/').slice(-2).join('/');
		//console.log('filename -> '+filename);
		cdn.create().upload({
			container: 'upac',
			remote: 'teste-upac-'+filename,
			local: req.files.uploadImage.path
		}, function(err) {
			if (err) {
				console.error('upload falhou: '+err);
				return;
			}
			console.info('upload com sucesso.');
		});
	}*/
}};