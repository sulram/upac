var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Article = mongoose.model('Article')
  , Img = mongoose.model('Img')

module.exports = function (cdn, img_helper) { return {
	admin: { 
		create: function (req, res, next) {
			var user = new User(req.body);
			user.provider = 'local';
			user.save(function(err) {
				if(err) {
					return next(err);
				}
				res.render('admin/user',{user:user, title:"Usuário novo: "+user.username});
			});
		},
		index: function (req, res, next) {
			var _from = req.param('from') || 0;
			var limit = req.param('limit') || 10;
			var sortby = req.param('sort_by') || '';
			var sortorder = req.param('order') || 1; 

			var query = User.find({});
			if (sortby !== '') {
				query.sort(sortby,sortorder?1:-1);
			};

			query.skip(_from).limit(limit);

			query.exec(function(err, users) {
				if(err) return next(err);
				var total = 0;
				User.count({}, function(err, count) {
					if (err) return next(err);
					total = count;
				})
				res.render('admin/users',{users:users, total:total, title:"Usuários"});
			});
		},
		show: function (req, res, next) {
			User.findById(req.param('id'),function(err, user) {
				if(err) return next(err);
				res.render('admin/user',{user: user, title:"Usuário: "+user.username});
			});
		},
		update: function (req, res, next) {
			User.findById(req.param('id'), function(err, user) {
				if(err) return next(err);
				if(!user) return next(null);
				
				///TODO: update da maneira certa
				user.save(function(err) {
					if (err) return next(err);
					res.redirect('/admin/user/'+req.param('id'))
				})

			});
		}
	},
	logout: function(req, res) {
		req.logout();
		res.jsonx({msg:'ok'});
	},
	login: function(req, res) {
		res.jsonx({
			msg:'ok',
			user: {
				id: req.user.id,
				username: req.user.username
			}
		});
	},

	create: function(req, res) {
		var user = new User(req.body);
		user.provider = 'local';
		user.save(function(err){
			if(err) {
				res.addJFlash('error', 'database error');
				return res.jsonx(500, {msg:'database error',
									  error:err});
			}
			req.login(user, function(err) {
				if (err) {
					return res.jsonx(500, {
						msg: 'session error',
						error: err
					});
				}
				req.session.unverified = true;
				res.jsonx({
					msg:'ok',
					user: {
						id: req.user.id,
						username: req.user.username
					}
				});

			});
		});
	},
	preloadById: function(req, res, next) {
		User.findById(req.param('id'), function(err, user) {
			if (err) {
				return res.jsonxf(500,
					[{error:'database error'}], 
					{msg: 'database error', error: err}
				);
			}
			if (!user) {
				return res.jsonxf(404,
					[{error:'user not found'}],
					{msg: 'user not found'}
				);
			}
			req.profile = user;
			next();
		});
	},
	update: function(req, res) {
		var user = req.profile;
		user.geo = req.body.geo;
		user.save(function(err) {
			if (err) {
				return res.jsonxf(500, 
					[{error:'database error'}],
					{msg:'database error', error: err});
			}
			res.jsonx({msg:'ok', user:user});
		})
	},
	setImage: function(req, res, next) {
		var user = req.profile;
		
		img_helper.thumbnail.upload_save(
			Img, cdn, req.files.image.path, 
			'profile',
			function(err, img) {
				if (err) {
					return res.jsonx(500, {msg: "error", error: err});
				}
				user.avatar = img.id;
				user.save(function(err) {
					if(err) return res.jsonx(500, {msg: "database error", error: err});
					res.jsonx({
						msg: "ok",
						image: img
					})

				})
			}
		);
	},
	verify: function(req, res, next) {
		var user = User
					.findOne({verificationToken:req.params.token})
					.exec(function(err, user) {
						if(err) return next(err);
						if(!user) return res.jsonx(401, {msg: 'token not found'});
						req.login(user, function(err) {
							if (err) {
								return res.jsonx(500, {msg:'session error'});
							}
							user.verificationToken = '';
							user.save(function(err){
								if (err) {
									return res.jsonx(500, {msg:'database error'});
								}
								delete req.session.unverified;
								res.redirect('/'); 
							});
						});						
						// TODO: avisar usuário no primeiro login
					});
	},
	index: function(req, res, next) {
		var _from = req.param('from') || 0;
		var limit = req.param('limit') || 10;
		var sortby = req.param('sort_by') || '';
		var sortorder = req.param('order') || 1; 

		var query = User.find({});
		if (sortby !== '') {
			query.sort(sortby,sortorder?1:-1);
		};

		query.skip(_from).limit(limit);

		query.exec(function(err, users) {
			if(err) return next(err);
			var total = 0;
			User.count({}, function(err, count) {
				if (err) return next(err);
				total = count;
			})
			res.jsonx({
				msg: 'ok',
				users: users,
				from: _from,
				limit: limit,
				sort_by: sortby,
				order: sortorder,
				total: total
			});
		});
	},
	show: function(req, res, next) {
		var query = User.findOne({username: req.params.username});
		query.exec(function(err, user) {
			if(err) return res.jsonx(401, {msg: 'error',error:err});//return next(err);
			if(!user) return res.jsonx(401, {msg: 'user not found'});
			res.jsonx({user:user});
		});
	},
	remove: function(req, res, next) {
		User.remove({_id: req.params.id}, function(err) {
			if(err) return next(err);
			res.jsonx({msg:'ok'});
		});
	},
	uploadImageTest: function(req, res, next) {
		var remote_name = 'user-test-'+req.files.image.name;
		img_helper.thumbnails.upload_save(Img, cdn, req.files.image.path, remote_name, "profile", function(err, img){
			res.jsonx({msg: "ok", image: img});
		})
	}
}}