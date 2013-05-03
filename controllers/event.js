var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Article = mongoose.model('Article'),
	_Event = mongoose.model('Event');

module.exports = function(cdn) { return {
	show: function(req, res, next) {
		_Event.findById(req.param.id, function(err, _event) {
			if (err) return next(err);
			if (!_event) return res.json(404, {error: "Event not found"});
			res.jsonx({
				msg: "ok",
				event: _event
			});
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
		_Event.remove({_id: req.param('id')});
		res.jsonx({msg: "ok"});
	}
}}
