var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Article = mongoose.model('Article')
  , Tag = mongoose.model('Tag')
  , Img = mongoose.model('Img')
  , Page = mongoose.model('Page')

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
				res.redirect('/admin/tags')
			})
		},
		search: function(req, res, next) {
			paginate.paginate(Tag,
				{$or: [{name: req.param('term')}, {slug: req.param('term')}]},
				{}, req, function(err, tags, pagination) {
					if (err) return next(err);
					res.render('admin/tag/index', {tags:tags, pagination:pagination});
				}
			);
		}

	},
	create: function(req, res) {
		if(req.body.type) {
			delete req.body.type;
		}
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
		if(req.body.type) {
			delete req.body.type;
		}
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
	findStartingWith: function(req, res, next) {
		Tag.find({$or:[{name: {$regex:req.param('start')}},{slug:{$regex:req.param('start')}}]}).limit(20).exec(function(err, tags){
			if(err) { return next(err);	}
			return res.jsonx({msg:'ok', tags:tags});
		});
	},
	everything2d: function(req, res, next) {
		//var query = {geo: {$near: req.param('center').split(','), $maxDistance:req.param('distance')}};
		User.find().select('-resetPasswordToken -verifyToken').populate('avatar tags').exec(function(err, users) {
			var query = {$nor: [{geo: null}, {geo: []}]};
			if(err) return next(err);
			query['publicationStatus'] = 'published';
			Article.find(query).populate('owners featuredImage tags').exec(function(err, articles) {
				if(err) return next(err);
				Page.find(query).populate('owners featuredImage tags').exec(function(err, pages) {
					return res.jsonx({
						msg: 'ok',
						articles:articles,
						pages:pages,
						users:users
					});
				});
			});
		});
	}
}};