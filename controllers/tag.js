var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Article = mongoose.model('Article')
  , Tag = mongoose.model('Tag')

module.exports = function (cdn, paginate) { return {
	admin: {
		index: function(req, res, next) {
			
		},
		editnew: function(req, res, next) {

		},
		create: function(req, res, next) {
			
		},
		
	},
	create: function(req, res) {
		var tag = new Tag(req.body);
		tag.save(function (err) {
			if(err) {
				return res.jsonxf(500, 
					[{error: 'database error'}],
					{msg: 'database error', error: err});
			}
			return res.jsonx({msg:'ok', tag:tag});
		});
	},
	preloadById: function(req, res, next) {
		Tag.findById(req.param('id'), function(err, tag) {
			if(err) {
				return res.jsonxf(500,
					[{error: 'database error'}],
					{msg: 'database error', error: err});
			}
			if(!tag) {
				return res.jsonxf(404,
					[{error: 'tag not found'}],
					{
						msg: 'tag not found',
						tag_id: req.param('id')
					});
			}
			req.tag = tag;
			next();
		});
	},
	update: function(req, res) {
		req.tag.update(req.body);
		req.save(function(err) {
			if(err) {
				return res.jsonxf(500,
					[{error: 'database error'}],
					{msg: 'database error', error: err});
			}
			res.jsonx({msg:'ok', tag:tag});
		});
	},
	show: function(req, res) {
		Tag.findById(req.param('id'), function(err, tag) {
			if(err) {
				return res.jsonxf(500,
					[{error: 'database error'}],
					{msg: 'database error', error: err});
			}
			if(!tag) {
				return res.jsonxf(404,
					[{error: 'tag not found'}],
					{
						msg: 'tag not found',
						tag_id: req.param('id')
					});
			}
			res.jsonx({msg: 'ok', tag:tag});
		});
	},
	bySlug: function(req, res) {
		Tag.findOne({slug:req.param('slug')}, function(err, tag) {
			if(err) {
				return res.jsonxf(500,
					[{error: 'database error'}],
					{msg: 'database error', error: err});				
			}
			if(!tag) {
				return res.jsonxf(404,
					[{error: 'tag not found'}],
					{
						msg: 'tag not found',
						tag_slug: req.param('slug')
					});				
			}
			res.jsonx({msg: 'ok', tag:tag});
		});
	},
	findStartingWith: function(req, res) {
		
	}
}};