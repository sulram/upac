/***********************
 * UPAC
 * Article controller (frontend and admin)
 ***********************/

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
		// list articles with pagination data
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
		// saves a new article
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
		// shows edit interface for a new article
		editnew: function(req, res, next) {
			var article = new Article();
			res.render('editor', {article:article, form_url:'/admin/article/', close_url:'/admin/articles'});
		},
		// shows an article
		show: function(req, res, next) {
			Article.findOne({_id: req.param('id')}).populate('featuredImage').exec(function(err, article) {
				if (err) return next(err);
				res.render('admin/article/show', {article:article});
			});
		},
		// shows edit interface for a previously stored article
		edit: function(req, res, next) {
			Article.findById(req.param('id'))
				.populate('featuredImage tags')
				.populate({path:'images.image',model:Img})
				.exec(function(err, article) {
					if (err) return next(err);
					res.render('editor', {article:article, form_url:'/admin/article/', close_url:'/admin/article/'+article.id});
				});
		},
		// saves alterations in an article - if it doesn't exist, it is created
		update: function(req, res, next) {
			var data = _.pick(req.body,
						'title', 'content', 'excerpt', 
						'publicationDate', 'publicationStatus',
						'images', 'attachments', 'featuredImage', 'tags', 'owners'
					);
					if(!data.featuredImage || (data.featuredImage.length == 0)) {
						data.featuredImage = null;
					}
					data.updatedAt = new Date;
					data.images = _.map(data.images, function(image) {
						return {image:image, size:'normal'}
					})
					// get tags as text and transform them into ObjectIDs
					var query = {_id: req.param('id')}
					data.tags = Tag.toIDs(data.tags);
					
					// try finding an article with that ID
					Article.findOne(query, function(err, article) {
						if(err) return res.jsonx(500, {error: err});

						if(!article) {
							// create a new article with the given ID
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
		// deletes an article
		remove: function(req, res, next) {
			Article.findByIdAndRemove(req.param('id'), function(err) {
				if (err) return next(err);
				res.redirect('/admin/articles');
			})
		},
		// generates short urls for articles without them
		generateShortUrls: function(req, res, next) {
			Article.find({hash: {$exists: false}}, function(err, articles) {
				if(err) return next(err);
				_.each(articles, function(article) {
					article.updatedAt = new Date();
					article.save(function(err) {
						if(err) console.error(err);
						else console.info("gen short url for article id "+article._id.toString());
					});
				})
				res.redirect('/admin/articles');
			})
		}
	},

	// shows edit interface for a new article
	neweditor: function(req, res, next) {
		var article = new Article({
			owners:[req.user.id],
			publicationStatus:"published"
		});
		res.render('editor',{title:"Editor", article:article, is_new:true});
	},

	// shows edit interface for a previously stored interface
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

	// saves an article
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
		data.tags = Tag.toIDs(data.tags);
		
		Article.findOne(query, function(err, article) {
			if(err) return res.jsonx(500, {error: err});
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

	// lists articles with pagination data
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

	// creates an article (unused)
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

	// sends data for showing an article
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

	// preloads article data for checking permissions
	preloadById: function(req, res, next) {
		var article = Article.findById(req.param('id'), function(err, article) {
			if(err) return next(err);
			if(!article) return res.jsonx(404, {error: 'article not found'});
			req.article = article;
			next();
		});
	},

	// saves article data
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

	// deletes an article
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

	// searches for an article by it's slug
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

	// searches articles by a tag's slug, returning a paginated articles list
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

    // generates a paginated list of posts for a user through it's username
	postsByUser: function(req, res, next) {
		User.findOne({username:req.param('username')},function(err, user) {
			if(err) return next(err);
			if(!user) return res.jsonx(404, {msg: "user not found"});
			paginate.paginate(Article,{owners:user.id, publicationStatus:'published', endDate: null, parent:null},
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

	// searches for a user's comments and returns a paginated list
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

	// treats and sends uploaded images to the CDN
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

	// sends uploaded attachments to the CDN
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

	// gets an article's comments
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

	// get an article's images
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

	// get an article's attachments
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

	// lists articles for the current logged-in user
	listByLoggedInUser: function(req, res, next) {
		User.findById(req.user.id, function(err, user) {
			if(err) return next(err);
			if(!user) return res.jsonx(404, {msg: "user not found"});
			paginate.paginate(Article,{owners:user.id, endDate: null, parent:null},
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

	// finds an article through it's short url hash
	shortened: function(req, res, next) {
		Article.findOne({
			hash: req.param('hash')
		},function(err, article) {
			if(err) return next(err);
			if(!article) return next(null, undefined);
			User.populate(article, {path: 'owners', select: 'username name avatar'}, function(err, _article) {
				Img.populate(_article, {path: 'owners.avatar'}, function(err, __article){
					res.render('arquivo-post', {article: __article});
				});
			});
		})
	},

	// renders a list of short urls for the articles
	shortListed: function(req, res, next) {
		Article.find({
			hash: {$exists: true},
			publicationStatus:'published',
			parent:null,
			endDate:null
		}, function(err, articles) {
			if(err) return next(err);
			User.populate(articles, {path: 'owners', select: 'username name'}, function(err, _articles) {
				res.render('arquivo', {articles: _articles});
			});
		})  
	}
}};