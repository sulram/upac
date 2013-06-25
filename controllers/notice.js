var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Notice = mongoose.model('Notice')
  , Img = mongoose.model('Img')
  , _ = require('underscore')

module.exports = function(cdn, paginate) {
	return {
		admin: {
			index: function(req, res, next) {
				paginate.paginate(Notice,{},{
					sort_by: 'order',
					order: -1, 
					limit: -1, // no limit
					populate:'owner image'
				},req, function(err, notices, pagination) {
					if(err) return next(err);
					res.render('admin/notice/index', {notices:notices, total:pagination.count, title:"Avisos", pagination:pagination});
				});
			},
			create: function(req, res, next) {
				var data = _.pick(req.body, 'owner', 'order', 'text', 'url')
				var notice = new Notice(data);
				if(req.files && req.files.image) {
					Img.upload(cdn, req.image_config,
						req.user.id,
						req.files.image.name,
						req.files.image.path,
						'notice-'+notice.id+'-image',
						'notice',
						function(err, image) {
							if(err) return next(err);
							notice.image = image.id;
							notice.save(function(err) {
								if(err) return next(err);
								res.redirect('/admin/notice/'+notice._id.toString());
							});
						});
				} else {
					notice.save(function(err) {
						if(err) return next(err);
						res.redirect('/admin/notice/'+notice._id.toString());
					});
				}
			},
			editnew: function(req, res, next) {
				res.render('admin/notice/new', {title: "Novo aviso", user: req.user.id || '' });
			},
			show: function(req, res, next) {
				Notice.findById(req.param('id'), function(err, notice) {
					if(err) return next(err);
					res.render('admin/notice/show', {notice:notice, title:"Aviso: "+notice.id});
				})
			},
			edit: function(req, res, next) {
				Notice.findById(req.param('id'), function(err, notice) {
					if(err) return next(err);
					res.render('admin/notice/edit', {notice:notice, title:"Editar aviso: "+notice.id});
				})
			},
			update: function(req, res, next) {
				var data = _.pick(req.body, 'owner', 'order', 'text', 'url')
				Notice.findById(req.param('id'), function(err, notice) {
					if (err) return next(err);
					if(req.files && req.files.image) {
						Img.uploadAndReplace(cdn, req.image_config, req.user.id,
							req.files.image.name,
							req.files.image.path,
							'notice-'+notice.id+'-image',
							'notice',
							function(err, image) {
								if(err) return next(err);
								notice.image = image.id;
								notice.set(data);
								notice.save(function(err) {
										if(err) return next(err);
										res.redirect('/admin/notice/'+req.param('id'));
									}
								);
							});
					} else {
						notice.set(data);
						notice.save(function(err) {
								if(err) return next(err);
								res.redirect('/admin/notice/'+req.param('id'));
							}
						);
					}
				});
			},
			remove: function(req, res, next) {
				Notice.findByIdAndRemove(req.param('id'), function(err) {
					if(err) return next(err);
					res.redirect('/admin/notices');
				})
			}
		},
		show: function(req, res, next) {
			Notice.findById(req.param.id, function(err, notice) {
				if(err) return next(err);
				if(!notice) return res.jsonx(404, {msg: "Notice not found"});
				res.jsonx({
					msg: "ok",
					notice: notice
				})
			});
		},
		create: function(req, res, next) {
			var notice = new Notice(req.body);
			notice.owner = req.user.id;
			notice.save(function(err) {
				if (err) return next(err);
				res.jsonx({
					msg: "ok"
				});
			});
		},
		remove: function(req, res, next) {
			res.notice.remove(function(err){
				if (err) return next(err);
				res.jsonx({
					msg: "ok"
				});
			});
		},
		index: function(req, res, next) {
			var from = req.param.from || 0;
			var limit = req.param.limit || 10;
			Notice.find({}).sort('-order').skip(from).limit(limit).populate('image owner').exec(function(err, notices) {
				if (err) return next(err);
				if (!notices) return res.jsonx(500, {msg: "Database error", error: "Notices array nonexistent"});
				res.jsonx({
					msg: "ok",
					notices: notices
				})
			})
		},
		byUsername: function(req, res, next) {
			var from = req.param.from || 0;
			var limit = req.param.limit || 10;
			User.find({username: req.param.username}, function(err, user) {
				if(err) return next(err);
				if(!user) {
					return res.jsonx(404, {
						msg: "User not found"
					})
				}
				Notice.find({owner: user.id}).skip(from).limit(limit).exec(function(err, notices) {
					if (err) return next(err);
					if (!notices) return res.jsonx(500, {msg: "Database error", error: "Notices array nonexistent"});
					res.jsonx({
						msg: "ok",
						user: user,
						notices: notices
					})
				});
			});
		}
	};
}
