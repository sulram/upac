var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Article = mongoose.model('Article')

module.exports = {
	logout: function(req, res) {
		req.logout();
		res.json({msg:'ok'});
	},
	login: function(req, res) {
		res.json({
			msg:'ok',
			user: {
				id: req.user.id,
				username: req.user.username,
				name: req.user.name
			}
		});
	},

	create: function(req, res) {
		var user = new User(req.body);
		user.provider = 'local';
		user.save(function(err){
			if(err) {
				return res.json(500, {msg:'database error',
									  error:err});
			}
			req.user = user;
			req.session.unverified = true;
			res.json({msg:'ok'});
		});
	},
	update: function(req, res) {
		var user = req.user;
		user.save(function(err) {
			if (err) {
				return res.json(500, {msg:'database error'});
			}
			res.json({msg:'ok'});
		})
	},
	verify: function(req, res, next) {
		var user = User
					.findOne({verificationToken:req.params.token})
					.exec(function(err, user) {
						if(err) return next(err);
						if(!user) return res.json(401, {msg: 'token not found'});
						req.user = user;
						user.verificationToken = '';
						user.save(function(err){
							if (err) {
								return res.json(500, {msg:'database error'});
							}
							delete req.session.unverified;
							res.redirect('/'); 
						});
						// TODO: avisar usuário no primeiro login
					});
	},
	index: function(req, res, next) {
		var _from = req.param('from') || 0;
		var limit = req.param('per_page') || 10;
		var sortby = req.param('sort_by') || '';
		var sortorder = req.param('order') || 1; 

		var query = User.find({});
		if (sortby !== '') {
			query.sort(sortby,sortorder?1:-1);
		};

		query.skip(_from).limit(limit);

		query.exec(function(err, users) {
			var _users = [];
			if(err) return next(err);
			for (var i in users) {
				var user = users[i];
				_users.push({
					username: user.username,
					name: user.name,
					createdAt: user.createdAt,
					//lastLogin: user.lastLogin
				})
			}
			var total = 0;
			User.count({}, function(err, count) {
				if (err) return next(err);
				total = count;
			})
			res.json({
				msg: 'ok',
				users: _users,
				from: _from,
				sort_by: sortby,
				order: sortorder,
				total: total
			});
		});
	},
	show: function(req, res, next) {
		var user = User
					.findOne({username: req.params.name})
					.exec(function(err, user) {
						if(err) return next(err);
						if(!user) return res.json(401, {msg: 'user not found'});
						res.json({user:user});
					});
	},
	remove: function(req, res, next) {
		User.remove({_id: req.params.id}, function(err) {
			if(err) return next(err);
			res.json({msg:'ok'});
		});
	}
}