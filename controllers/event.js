var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Article = mongoose.model('Article'),
	_Event = mongoose.model('Event');

module.exports = function(cdn) { return {
	admin: {
		
	},
	show: function(req, res, next) {
		Article.findOne({_id:req.param.id}, function(err, article) {
			if (err) return next(err);
			if (!article) return res.json(404, {error: "Event not found"});
			res.jsonx({
				msg: "ok",
				event: article
			});
		});
	},
	preloadById: function(req, res, next) {
		Article.findById(req.param.id, function(err, _event) {
			if (err) return next(err);
			if (!_event) return res.json(404, {error: "Event not found"});
			res._event = _event;
			next();
		});
	},
	create: function(req, res, next) {
		var _event = new _Event(req.body);
		_event.save(function(err) {
			if(err) return next(err);
			res.jsonx({msg: "ok"});
		});
	},
	remove: function(req, res, next) {
		res._event.remove(function(err){
			if (err) return next(err);
			res.jsonx({msg: "ok"});
		});
	},
	near: function(req, res, next) {
		Article.findOne({geo: {$nearSphere: req.param.center, $maxDistance: req.param.radius}}, 
			function(err, events) {
				if (err) return err;
				res.jsonx({
					msg: "ok",
					events: events
				});
			}
		);
	},
	happening: function(req, res, next) {
		var now = new Date();
		Article.find(
			{startDate: {"$lte": now}, endDate: {"$gt": now}},
			function(err, events) {
				if (err) return err;
				res.jsonx({
					msg: "ok",
					events: events
				});
			}
		);
	},
	past: function(req, res, next) {
		var now = new Date();
		Article.find(
			{endDate: {"$lt": now}},
			function(err, events) {
				if (err) return err;
				res.jsonx({
					msg: "ok",
					events: events
				});
			}
		);
	},
	future: function(req, res, next) {
		var now = new Date();
		Article.find(
			{startDate: {"$gt": now}},
			function(err, events) {
				if (err) return err;
				res.jsonx({
					msg: "ok",
					events: events
				});
			}
		);
	}
}}
