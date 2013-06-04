var mongoose = require('mongoose')
  , ObjectId = mongoose.Schema.ObjectId
  , Schema = mongoose.Schema
  , gm = require('gm')
  , _ = require('underscore')
  , temp = require('temp');

var ImgSizeSchema = new Schema({
	size: String,
	cdn_id: String,
	cdn_url: String
});

var ImgSchema = new Schema({
	uploader: {type: ObjectId, ref: 'User'},
	filename: String,
	cdn_id: String,
	sizes: [ImgSizeSchema]
});
var make_thumbs =  function(file, base_name, image_config, variant, file_cb, all_cb) {
		temp.mkdir('upac-thumbnails', function(err, tempdir) {
			if(err) return all_cb(err);;
			//console.log(tempdir);
			var files = [];	
			var errors = [];
			//console.log("variants: %j", image_config.variants[variant]);
			_.each(image_config.variants[variant], function(size, sizename) {
				//console.log("imagem: %s tamanho: %s -> %j", base_name, sizename, size);
				var endfilename = base_name + '_' + sizename + '.' + image_config.format;
				var endfilepath = temp.path({suffix:"."+image_config.format});
				gm(file).resize(size.w, size.h).write(endfilepath, function(err){
					if(err) return file_cb(err, {size: sizename, filename: endfilename, path:endfilepath});
					files.push( {size: sizename, filename: endfilename, path:endfilepath} );
					file_cb(null, {size: sizename, filename: endfilename, path:endfilepath} );
				});
			});
		});
		
	};
ImgSchema.statics.upload = function(cdn, image_config, user_id, file_name, base_name, cb) {
	var uploader = cdn.create();
	var sizes = [];
	var errors = [];
	var images = make_thumbs(file, base_name, image_config, variant, function(err, image) {
		if(err) return cb(err);
		uploader.upload({
			container: cdn.container,
			remote: image.filename,
			local: image.path,
		}, function(err) {
			if(err) { errors.push({error: err, file: image.path}); return; }
			//console.info("arquivo final: " + cdn.server_url + image.filename);
			sizes.push( {
				size: image.size,
				cdn_id: image.filename,
				cdn_url: cdn.server_url + image.filename
			});
		})
	}, function(err, all) {
		if(err) return cb(err);
		uploader.upload({
			container: cdn.container,
			remote: base_name,
			local: file
		}, function(err) {
			if(err) return cb(err);
			var img = new Img();
			img.uploader = user_id;
			img.filename = base_name;
			img.sizes = sizes;
			img.save(function(err2) {
				if (err2) return cb(err2);
				cb(null, img);
			});
		});
	});
}
ImgSchema.statics.uploadAndReplace = function(prev_id, cdn, image_config, user_id, file_name, base_name, cb) {
	return this.upload(cdn, image_config, user_id, file_name, base_name, function(err, image) {
		if(err) return cb(err, image);
		if(prev_id == null || prev_id == undefined) {
			return cb(null, image);
		}
		this.findByIdAndRemove(prev_id, function(err, img) {
			var cdn_obj = cdn.create();
			_.each(img.sizes, function(size) {
				cdn_obj.remove({
					container: cdn.container,
					remote: size.cdn_id
				})
			});
		});
	})
}
ImgSchema.methods.getSize = function(variant) {
	return this.sizes[variant];
}

var ArticleImgRefSchema = new Schema({
	img: {type: ObjectId, ref: 'Image'},
	article: {type: ObjectId, ref: 'Article'}
});

mongoose.model('Img', ImgSchema);
mongoose.model('ArticleImgRef', ArticleImgRefSchema);