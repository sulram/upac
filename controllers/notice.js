var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Notice = mongoose.model('Notice')

module.exports = {
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
		Notice.find({}).sort('date',-1).skip(from).limit(limit).exec(function(err, notices) {
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
}