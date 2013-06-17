var mongoose = require('mongoose')
  , Img = mongoose.model('Img')

var inner = {
	upload: function(cdn, file, cb) {

	},
	uploadMany: function(cdn, file, cb) {

	},
	remove: function(cdn, file, cb) {

	},
	removeMany: function(cdn, files, cb) {

	}
}

module.exports = function(cdn, paginate) {
	return {
		admin: {
			index: function(req, res, next) {
				paginate.paginate(Img, {}, {}, req, function(err, imgs, pagination) {
					if(err) return next(err);
					res.render('admin/image/index',{imgs:imgs, pagination:pagination});
				});
			},
			editnew: function(req, res, next) {
				res.render('admin/image/new',{});
			},
			create: function(req, res, next) {
				var img = new Img(req.body);
				img.save(function(err) {
					if (err) return next(err);
					res.redirect('/admin/image/#{img.id}');
				});
			},
			edit: function(req, res, next) {
				Img.findById(req.param('id'), function(err, img) {
					if (err) return next(err);
					res.render('admin/image/edit',{img:img});
				});
			},
			update: function(req, res, next) {
				if(req.files && (req.files.length > 0)) {

				} else {
					Img.update({id:req.param('id')}, {$set:req.body}, function(err, img) {
						if(err) return next(err);
						res.redirect('/admin/image/'+req.param('id'));
					});
				}
			},
			remove: function(req, res, next) {
				Img.remove({'id':req.param('id')}, function(err) {
					if (err) return next(err);
					res.redirect('/admin/images');
				});
			}

		},

		upload: function(req, res, next) {
			
		},

		remove: function(req, res, next) {

		}
	}
}