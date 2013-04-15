var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Article = mongoose.model('Article'),
	_Event = mongoose.model('Event');

module.exports = {
	show: function(req, res, next) {
		_Event.findById(req.param.id, function(err, _event) {
			if (err) return next(err);
			if (!_event) return res.json(404, {error: "Event not found"});
			res.json({
				msg: "ok",
				event: _event
			});
		});
	},
	create: function(req, res, next) {
		var _event = new _Event(req.body);
		_event.save(function(err) {
			if(err) return next(err);
			res.json({msg: "ok"});
		});
	}
}
