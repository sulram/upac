var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Article = mongoose.model('Article')
  , Img = mongoose.model('Img')

module.exports = function (cdn, img_helper) { return {
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
		var image = new Img();
		image.filename = req.files.image.name;
		var user = req.profile;
		image.remote_name = 'user-'+user.id.toString()+"-"+image.filename;

		/*
		cdn.create().upload({
			container: cdn.container,
			remote: image.remote_name,
			local: req.files.image.path
		}, function(err) {
			if(err) return res.jsonx(500, {msg: "error uploading file to server"});
			image.save(function(err) {
				if (err) return res.jsonx(500, {msg: "database error", error:err});
				var user = req.profile;
				user.image = image.id;
				user.save(function(err) {
					if(err) return res.jsonx(500, {msg: "database error", error:err});
					res.jsonx({msg: "ok", image:image});
				});
			});
		})
		*/
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
	}
}}