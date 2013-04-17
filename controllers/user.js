var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Article = mongoose.model('Article')

module.exports = function (cdn) { return {
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
				return res.jsonx(500, {msg:'database error',
									  error:err});
			}
			req.user = user;
			req.session.unverified = true;
			res.jsonx({
				msg:'ok',
				user: {
					id: req.user.id,
					username: req.user.username
				}
			});
		});
	},
	preloadById: function(req, res, next) {
		User.findById({_id: req.param('id')}, function(err, user) {
			if (err) {
				req.addJFlash('error', 'database error');
				return req.jsonx(500, {msg: 'database error', error: err});
			}
			if (!user) {
				req.addJFlash('error', 'user not found');
				return req.jsonx(404, {msg: 'user not found'});
			}
			req.profile = user;
			next();
		});
	},
	update: function(req, res) {
		var user = req.user;
		user.geo = req.body.geo;
		user.save(function(err) {
			if (err) {
				return res.jsonx(500, {msg:'database error'});
			}
			res.jsonx({msg:'ok'});
		})
	},
	verify: function(req, res, next) {
		var user = User
					.findOne({verificationToken:req.params.token})
					.exec(function(err, user) {
						if(err) return next(err);
						if(!user) return res.jsonx(401, {msg: 'token not found'});
						req.user = user;
						user.verificationToken = '';
						user.save(function(err){
							if (err) {
								return res.jsonx(500, {msg:'database error'});
							}
							delete req.session.unverified;
							res.redirect('/'); 
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