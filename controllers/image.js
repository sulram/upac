/***********************
 * UPAC
 * Images controller (admin)
 ***********************/

var mongoose = require('mongoose')
  , Img = mongoose.model('Img')


module.exports = function(cdn, paginate) {
	return {
		admin: {
			// lists all uploaded images
			index: function(req, res, next) {
				paginate.paginate(Img, {}, {populate: 'uploader'}, req, function(err, imgs, pagination) {
					if(err) return next(err);
					res.render('admin/image/index',{images:imgs, pagination:pagination});
				});
			},
			// shows data for a single image
			show: function(req, res, next) {
				Img.findById(req.param('id'), function(err, img) {
					if(err) return next(err);
					res.render('admin/image/show', {image:img});
				})
			},
			// shows the edit interface for a new image
			editnew: function(req, res, next) {
				res.render('admin/image/new',{});
			},
			// creates an image with the given data
			create: function(req, res, next) {
				var img = new Img(req.body);
				img.save(function(err) {
					if (err) return next(err);
					res.redirect('/admin/image/#{img.id}');
				});
			},
			// shows the edit interface for a previously stored window
			edit: function(req, res, next) {
				Img.findById(req.param('id'), function(err, img) {
					if (err) return next(err);
					res.render('admin/image/edit',{image:img});
				});
			},
			// updates database info for a given image
			update: function(req, res, next) {
				if(req.files && req.files.image) {
					Img.replace(cdn, req.image_config, req.files.image.name, req.files.image.path, 
						'replaced-image-'+req.param('id')+'-'+(new Date()).getTime(), req.param('variant'), function(err, image) {
							if(err) return next(err);
							res.redirect('/admin/image/'+req.param('id'));
						})
				} else {
					Img.update({_id:req.param('id')}, {$set:req.body}, function(err, img) {
						if(err) return next(err);
						res.redirect('/admin/image/'+req.param('id'));
					});
				}
			},
			// removes an image
			remove: function(req, res, next) {
				Img.remove({'id':req.param('id')}, function(err) {
					if (err) return next(err);
					res.redirect('/admin/images');
				});
			}

		},
		// lists image data for a given image
		show: function(req, res, next) {
			Img.findById(req.param('id'), function(err, img) {
				if(err) return res.jsonx(500, {msg:"error", error:err});
				if(!img) return res.jsonx(404, {msg:"error", error:"image not found", id:req.param('id')});
				res.jsonx({msg: "ok", image:img});
			})
		}
	}
}