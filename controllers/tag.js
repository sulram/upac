var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Article = mongoose.model('Article')
  , Tag = mongoose.model('Tag')

module.exports = function (cdn, paginate) { return {
	admin: {
		index: function(req, res, next) {
			paginate.paginate(Tag, {}, {}, req, function(err, tags, pagination) {
				if (err) return next(err);
				res.render('admin/tag/index', {tags:tags, pagination:pagination});
			});
		},
		editnew: function(req, res, next) {
			res.render('admin/tag/new', {})
		},
		create: function(req, res, next) {
			var tag = new Tag(req.body);
			tag.save(function(err) {
				if(err) return next(err);
				res.redirect('/admin/tag/'+tag.id);
			});
		},
		show: function(req, res, next) {
			Tag.findById(req.param('id'), function(err, tag) {
				if(err) return next(err);
				res.render('admin/tag/show', {tag:tag});
			})
		},
		edit: function(req, res, next) {
			Tag.findById(req.param('id'), function(err, tag) {
				if(err) return next(err);
				res.render('admin/tag/edit', {tag:tag});
			});
		},
		update: function(req, res, next) {
			Tag.update({id:req.param('id')}, {$set: req.body}, function(err) {
				if(err) return next(err);
				res.redirect('/admin/tag/'+req.param('id'));
			});
		},
		remove: function(req, res, next) {
			Tag.findByIdAndRemove(req.param('id'), function(err, tag) {
				if(err) return next(err);
				res.redirect('/admin/tag')
			})
		}


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
	byUserId: function(req, res) {
		User.findById(req.param('id'), function(err, user) {
			if(err) {
				return res.jsonxf(500, [{error: 'database error'}],
					{msg: 'database error', error: err});
			}
			if(!user) {
				return res.jsonxf(404, [{error: 'user not found'}],
					{msg: 'user not found', user_id: req.param('id')});
			}
			paginate.paginate(Tag, {id: user.tags}, {}, req, function(err, tags, pag) {
				if(err) return err;
				res.jsonx({msg: 'ok', tags: tags, paginate:pag});
			});
		})
	},
	findStartingWith: function(req, res) {
		Tag.find({name: {$regex:req.param('start')}}).limit(20).exec(function(err, tags){
			if(err) {
				return res.jsonxf(500,
					[{error: 'database error'}],
					{msg: 'database error', error: err});
			}
			return res.jsonx({msg:'ok', tags:tags});
		});
	}
}};