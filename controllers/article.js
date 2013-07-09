 var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Article = mongoose.model('Article')
  , Img = mongoose.model('Img')
  , Attachment = mongoose.model('Attachment')
  , Tag = mongoose.model('Tag')
  , fs = require('fs')
  , _ = require('underscore')

module.exports = function(cdn, paginate){ return {
	admin: {
		index: function(req, res, next) {
			paginate.paginate(Article,
				{
					startDate:null,
					endDate:null,
					parent:null,
				},{populate:'featuredImage owners', sort_by: 'createdAt', order: -1}, req, function(err, articles, pagination) {
					if(err) return next(err);
					var total = 0;
					Article.count({}, function(err, count){
						if(err) return next(err);
						total = count;
					});
					res.render('admin/article/index', {articles:articles, total:total, pagination:pagination});
				}
			);
		},
		create: function(req, res, next) {
			if(req.body.parent == '') {
				delete req.body.parent;
			}
			var article = new Article(req.body);
			article.createdAt = new Date();
			article.save(function(err) {
				if(err) return next(err);
				res.redirect('/admin/article/'+article.id);
				//res.render('admin/article/shownew',{article:article, title:"Artigo novo: "+article.title});
			});
		},
		editnew: function(req, res, next) {
			res.render('admin/article/new', {title: 'Novo artigo'});
		},
		show: function(req, res, next) {
			Article.findOne({_id: req.param('id')}).populate('featuredImage').exec(function(err, article) {
				if (err) return next(err);
				res.render('admin/article/show', {article:article});
			});
		},
		edit: function(req, res, next) {
			Article.findById(req.param('id'), function(err, article) {
				if (err) return next(err);
				res.render('admin/article/edit', {article:article});
			});
		},
		update: function(req, res, next) {
			if(req.body.parent == '') {
				delete req.body.parent;
			}
			Article.update({_id:req.param('id')}, {$set: req.body},
				function(err, article) {
					if (err) {
						if (err.code === 11000) { // duplicate key
							req.flash('error', 'Slug já existe');
							res.redirect('/admin/article/'+req.param('id'))
						} else {
							return next(err);
						}
					}
					res.redirect('/admin/article/'+req.param('id'));
				}
			);
		},
		remove: function(req, res, next) {
			Article.findByIdAndRemove(req.param('id'), function(err) {
				if (err) return next(err);
				res.redirect('/admin/articles');
			})
		}
	},
	neweditor: function(req, res, next) {
		var article = new Article({
			owners:[req.user.id],
			publicationStatus:"published"
		});
		res.render('editor',{title:"Editor", article:article, is_new:true});
	},
	editor: function(req, res, next) {
		var query = {_id: req.param('id')}
		if (!req.isAdmin()) {
			query['owners'] = req.user.id;
		}
		Article.findOne(query)
			.populate('featuredImage tags')
			.populate({path:'images.image',model:Img})
			.exec(function(err, article) {
				if(err) return next(err);
				if(!article) return next(null, article);
				if(!article.featuredImage && (article.images.length > 0)) {
					article.featuredImage = article.images[0].image;
				}
				console.log(article);
				res.render('editor',{title:"Editor", article:article, is_new:false});
			}
		);
	},
	editorsave: function(req, res, next) {
		var data = _.pick(req.body,
			'title', 'content', 'excerpt', 
			'publicationDate', 'publicationStatus',
			'images', 'attachments', 'featuredImage', 'tags'
		);
		if(!data.featuredImage || (data.featuredImage.length == 0)) {
			data.featuredImage = null;
		}
		data.updatedAt = new Date;
		data.images = _.map(data.images, function(image) {
			return {image:image, size:'normal'}
		})
		// pegar tags e transformar em ObjectIDs
		var query = {_id: req.param('id')}
		if (data.tags) {
			data.tags = _.map(data.tags, function(tag) {
				var m = tag.match(/^[0-9a-fA-F]{24}$/);
				if (m && m.length == 1) {
					return tag;
				} else {
					var ntag = new Tag({name:tag});
					ntag.save(function(err){
						console.info("Salvando tag %j", ntag);
					})
					return ntag._id;
				}
			});
		}
		console.info(data);
		
		Article.findOne(query, function(err, article) {
			if(err) return res.jsonx(500, {error: err});

			if (article && !_.find(article.owners, function(owner) {
				return owner == req.user.id;
			})) return res.jsonx(401, {msg: 'unauthorized'});

			if(!article) {
				data.owners = [req.user.id];
				article = new Article(data);
				article._id = mongoose.Types.ObjectId(req.param('id'));
			} else {
				if(!req.isAdmin() && !_.find(article.owners, function(owner){ return owner == req.user.id})) {
					return res.jsonx(401, {msg: 'error', err: 'unauthorized'})
				}
				article.set(data);
			}
			article.save(function(err) {
				if(err) return res.jsonx(500, {error: err});
				res.jsonx({
					msg: 'ok',
					article: article,
				});
			});
		});
	},
	index: function(req, res) {
		paginate.paginate(Article,
			{
				publicationStatus:'published',
				parent:null,
				startDate:null,
				endDate:null
			},{
				populate:[
					{path:'owners', select:'-resetPasswordToken -verifyToken'},
					{path:'tags'}
				]
			},
			req,
			function(err, articles, pagination) {
				if(err) return next(err);
				articles = _.map(articles, function(article) {
					if(!article.featuredImage && (article.images.length > 0)) {
						article.featuredImage = article.images[0].image;
					}
					return article;
				});
				Img.populate(articles, 'featuredImage owners.avatar', function(err, _articles) {
					res.jsonx({
						msg:'ok',
						articles: _articles,
						from: pagination.from,
						sort_by: pagination.sort_by,
						order: pagination.order,
						count: pagination.count
					});

				})
			}
		);
	},
	create: function(req, res, next) {
		var article = new Article(req.body);
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
		Article.findById(req.params.id)
			.populate({path:'owners', select:'-resetPasswordToken -verifyToken'})
			.populate('images.image featuredImage tags')
			.exec(function(err, article){
			if(err) return next(err);
			if(!article) return res.jsonx(404, {error: 'article not found'});
			if(!article.featuredImage && (article.images.length > 0)) {
				article.featuredImage = article.images[0];
			}
			Img.populate(article, {path:'owners.avatar'},function(err, _article) {
				res.jsonx({article:_article});
			});
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
		var data = _.pick(req.body,
			'title', 'content', 'excerpt', 
			'publicationDate', 'publicationStatus',
			'images', 'tags', 'attachments', 'owners', 'featuredImage');
		data.updatedAt = new Date;
		console.info(data.images);
		data.images = _.map(data.images, function(image) {
			return {image:image, size:"normal"}
		})
		console.info(data.images);
		req.article.set(data);
		req.article.save(function(err) {
			if (err) return res.jsonx(500, {error: 'internal server error'});
			res.jsonx({
				msg: 'ok',
				article: article,
			});
		});
	},
	remove: function(req, res, next) {
		var query = {_id: req.param('id')};
		if(!req.isAdmin()) {
			query['owners'] = req.user.id;
		}
		Article.remove(query,function(err){
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
    byTag: function(req, res) {
        Tag.findOne({slug:req.param('slug')}, function(err, tag) {
            if(err) {
                return res.jsonxf(500,
                    [{error: 'database error'}],
                    {msg: 'database error', error: err});               
            }
            if(!tag) {
                return res.jsonxf(404,
                    [{error: 'tag not found'}],
                    {
                        msg: 'tag not found',
                        tag_slug: req.param('slug')
                    });
            }
            paginate.paginate(Article,
            	{
            		tags: tag._id,
            		publicationStatus:'published',
            		parent: null,
            		startDate: null,
            		endDate: null,
            	},{populate:'featuredImage owners'}, req, function(err, articles, pagination) {
                if(err) return next(err);
                Img.populate(articles, 'owners.avatar', function(err, _articles){
                    res.jsonx({
                        msg:'ok',
                        tag: tag,
                        articles: _articles,
                        from: pagination.from,
                        sort_by: pagination.sort_by,
                        order: pagination.order,
                        count: pagination.count
                    });
                });
            });
        });
    },
	postsByUser: function(req, res, next) {
		User.findOne({username:req.param('username')},function(err, user) {
			if(err) return next(err);
			if(!user) return res.jsonx(404, {msg: "user not found"});
			paginate.paginate(Article,{owners:user.id, publicationStatus:'published', parent:null},
								{populate:[
									{path:'featuredImage'},
									{path: 'owners', select: '-resetPasswordToken -verifyToken'}
								]}, req, function(err, articles, pagination) {
				if(err) return next(err);
				Img.populate(articles, 'owners.avatar', function(err, _articles){
					res.jsonx({
						msg:'ok',
						articles: _articles,
						from: pagination.from,
						sort_by: pagination.sort_by,
						order: pagination.order,
						count: pagination.count
					});
				});
			});
		});
	},
	commentsByUser: function(req, res, next) {
		User.findOne({username:req.param('username')},function(err, user) {
			if(err) return next(err);
			if(!user) return res.jsonx(404, {msg: "user not found"});
			paginate.paginate(Article,{owners:user.id, publicationStatus:'published', parent: {$ne: null}},
				{populate: {path:"parent", select:"title"}},
				req, function(err, articles, pagination) {
			//Article.find({owners:user.id}).populate('images.image').exec(function(err, articles) {
				if(err) return next(err);
				res.jsonx({
					msg:'ok',
					articles: articles,
					from: pagination.from,
					sort_by: pagination.sort_by,
					order: pagination.order,
					count: pagination.count
				});
			});

		});
	},
	uploadImage: function(req, res, next) {
		var article_id = req.param('id');
		Img.upload(cdn, req.image_config,
			req.user.id,
			req.files.image.name,
			req.files.image.path,
			'article-'+article_id+'-content',
			'content',
			function(err, image) {
				if(err) return next(err);
				res.jsonx({
					msg:'ok',
					image: image
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
	getComments: function(req, res, next) {
		paginate.paginate(Article,{publicationStatus:'published', parent:req.param('id')},
			{populate:[
				{path:'owners', select:'-resetPasswordToken -verifyToken'},
				{path:'featuredImage'}
			]}, req, function(err, articles, pagination) {
				if(err) return next(err);
				Img.populate(articles, {path:'owners.avatar'},function(err, _articles) {
					res.jsonx({
						msg:'ok',
						articles: _articles,
						from: pagination.from,
						sort_by: pagination.sort_by,
						order: pagination.order,
						count: pagination.count
					});
				});
			}
		);
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
	},
	listByLoggedInUser: function(req, res, next) {
		paginate.paginate(Article,{owner: req.user.id},{}, req, function(err, articles, pagination) {
				if(err) return next(err);
				res.jsonx({
					msg:'ok',
					articles: articles,
					from: pagination.from,
					sort_by: pagination.sort_by,
					order: pagination.order,
					count: pagination.count
				});
			}
		);
	},
}};