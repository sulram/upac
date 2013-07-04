 var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Page = mongoose.model('Page')
  , Img = mongoose.model('Img')
  , Attachment = mongoose.model('Attachment')
  , fs = require('fs')
  , _ = require('underscore')

module.exports = function(cdn, paginate){ return {
	admin: {
		index: function(req, res, next) {
			paginate.paginate(Page,
				{
					geo:null
				},
				{}, req, function(err, pages, pagination) {
					if(err) return next(err);
					var total = 0;
					Page.count({}, function(err, count){
						if(err) return next(err);
						total = count;
					});
					res.render('admin/page/index', {pages:pages, total:total, pagination:pagination});
				}
			);
		},
		create: function(req, res, next) {
			var page = new Page(req.body);
			page.createdAt = new Date();
			page.save(function(err) {
				if(err) return next(err);
				res.redirect('/admin/page/'+page.id);
			});
		},
		editnew: function(req, res, next) {
			res.render('admin/page/new', {title: 'Nova Página', page: new Page()});
		},
		show: function(req, res, next) {
			Page.findById(req.param('id'), function(err, page) {
				if (err) return next(err);
				res.render('admin/page/show', {page:page});
			});
		},
		edit: function(req, res, next) {
			Page.findById(req.param('id'), function(err, page) {
				if (err) return next(err);
				res.render('admin/page/edit', {page:page});
			});
		},
		update: function(req, res, next) {
			Page.update({_id:req.param('id')}, {$set: req.body},
				function(err, page) {
					if (err) {
						if (err.code === 11000) { // duplicate key
							req.flash('error', 'Slug já existe');
							res.redirect('/admin/page/'+req.param('id'))
						} else {
							return next(err);
						}
					}
					res.redirect('/admin/page/'+req.param('id'));
				}
			);
		},
		remove: function(req, res, next) {
			Page.findByIdAndRemove(req.param('id'), function(err) {
				if (err) return next(err);
				res.redirect('/admin/pages');
			})
		},
		uploadImage: function(req, res, next) {
			var page_id = req.param('id');
			Img.upload(cdn, req.image_config,
				req.user.id,
				req.files.image.name,
				req.files.image.path,
				'page-'+page_id+'-content',
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
			Page.findById(req.param('id'), function(err, page){
				if(err) return next(err);
				if(!page) return res.jsonx(404, {msg: "page not found"});
				var attachment = new Attachment();
				var path = req.files.upload.name;
				attachment.filename = path.split('/').slice(-2).join('/');
				attachment.remote_name = 'page-'+page.id+'/attachments/'+attachment.filename;
				cdn.create().upload({
					container:cdn.container,
					remote: attachment.remote_name,
					local: req.files.attachment.path// <-- attachment = name do item no form de upload
				}, function(err) {
					if (err) return next(err);
					attachment.save();
					page.attachments.push(attachment.id);
					page.save(function(err){
						if (err) return res.jsonx(500, {msg: "error saving image"});
						res.jsonx({msg:"ok", image:img});
					});

				});
			});
		},
	},
	neweditor: function(req, res, next) {
		var page = new Page({
			publicationStatus:""
		});
		res.render('editor',{title:"Editor", page:page, is_new:true});
	},
	editor: function(req, res, next) {
		var query = {_id: req.param('id')}
		Page.findOne(query)
			.populate('images.image')
			.exec(function(err, page) {
				if(err) return next(err);
				console.log(page);
				if(!page) return next(null, page);
				res.render('editor',{title:"Editor", page:page, is_new:false});
			}
		);
	},
	editorsave: function(req, res, next) {
		var data = _.pick(req.body,
			'title', 'content',
			'publicationDate', 'publicationStatus',
			'images', 'attachments'
		);
		data.updatedAt = new Date;
		console.info(data.images);
		data.images = _.map(data.images, function(image) {
			return {image:image[0], size:image[1]}
		})
		console.info(data.images);
		// TODO: pegar tags e transformar em ObjectIDs
		var query = {_id: req.param('id')}
		Page.findOne(query, function(err, page) {
			if(err) return res.jsonx(500, {error: err});
			if(!page) {
				data._id = mongoose.Types.ObjectId(req.body.id);
				page = new Page(data);
			} else {
				page.set(data);
			}
			page.save(function(err) {
				if(err) return res.jsonx(500, {error: err});
				res.jsonx({
					msg: 'ok',
					page: page,
				});
			});
		});
	},
	index: function(req, res) {
		paginate.paginate(Page,{publicationStatus:'published'},{populate:'images.image'}, req, function(err, pages, pagination) {
				if(err) return next(err);
				res.jsonx({
					msg:'ok',
					pages: pages,
					from: pagination.from,
					sort_by: pagination.sort_by,
					order: pagination.order,
					count: pagination.count
				});
			}
		);
	},
	create: function(req, res, next) {
		var page = new Page(req.body);
		page.save(function(err) {
			if (err) return next(err);
			res.jsonx({
				msg:'ok',
				page: page
			});
		});
	},
	show: function(req, res, next) {
		Page.findById(req.params.id)
			.populate('images.image')
			.exec(function(err, page){
			if(err) return next(err);
			if(!page) return res.jsonx(404, {error: 'page not found'});
			_.each(page.images, function(image){
				var size = {cdn_url:image.image.original_cdn_url};
				var nsize = _.detect(image.image.sizes,function(img){ return img.size == image.size; });
				size = nsize||size;
				page.content+=("\n["+image.image.id+"]: "+size.cdn_url);				
			})
			res.jsonx({page:page});
		});
	},
	preloadById: function(req, res, next) {
		var page = Page.findById(req.param('id'), function(err, page) {
			if(err) return next(err);
			if(!page) return res.jsonx(404, {error: 'page not found'});
			req.page = page;
			next();
		});
	},
	update: function(req, res) {
		var data = _.pick(req.body,
			'title', 'content',
			'publicationDate', 'publicationStatus',
			'images', 'attachments');
		data.updatedAt = new Date;
		console.info(data.images);
		data.images = _.map(data.images, function(image) {
			return {image:image[0], size:image[1]}
		})
		console.info(data.images);
		req.page.set(data);
		req.page.save(function(err) {
			if (err) return res.jsonx(500, {error: 'internal server error'});
			res.jsonx({
				msg: 'ok',
				page: page,
			});
		});
	},
	bySlug: function(req, res, next) {
		Page.findOne({slug:req.param('slug')}, function(err, page) {
			if(err) return next(err);
			if(!page) return res.jsonx(404, {msg: "page not found"});
			res.jsonx({
				msg:'ok',
				page: page,
			});
		});
	},
	getImages: function(req, res, next) {
		Page.findById(req.param('id')), function(err, page) {
			if (err) return next(err);
			if (!page) return res.jsonx(404, {msg: "page not found"});
			Img.find({_id:page.images}, function(err, images) {
				if (err) return next(err);
				if (!images) return res.jsonx({images:[]});
				res.jsonx({attachments: _.map(page.attachments, function(attachment){
					attachment.remote_name = cdn.server_url+attachment.remote_name;
					return attachment;
				})});
			});
		}
	},
	getAttachments: function(req, res, next) {
		Page.findById(req.param('id')), function(err, page) {
			if (err) return next(err);
			if (!page) return res.jsonx(404, {msg: "page not found"});
			Attachment.find({_id:page.attachments}, function(err, attachments){
				if (err) return next(err);
				if (!attachments) return res.jsonx({attachments:[]});
				res.jsonx({attachments: _.map(attachments, function(attachment){
					attachment.remote_name = cdn.server_url+attachment.remote_name;
					return attachment;
				})});
			});
		}
	},
}};