module.exports = function(config, _){
	var //gm = require('gm'),
		image_config = config.image_config,
	    async = require('async'),
	    temp = require('temp');
	//var make_thumbs =  function(file, variant, file_cb, all_cb) {
	var make_thumbs =  function(file, base_name, variant, file_cb, all_cb) {
		temp.mkdir('upac-thumbnails', function(err, tempdir) {
			if(err) return all_cb(err);;
			console.log(tempdir);
			var files = [];	
			var errors = [];
			async.map(image_config.variants[variant], function(size, callback){
				var endfilename = base_name + '_' + size.name + '.' + image_config.format;
				//var endfilepath = tempdir + '/' + endfilename;
				var endfilepath = temp.path({suffix:image_config.format});
				gm(file).resize(size.w, size.h, "px").write(endfilepath, function(err){
					if(err) return file_cb(err);
					files.push( {size: size.name, filename: endfilename, path:endfilepath} );
					file_cb(null, {size: size.name, filename: endfilename, path:endfilepath} );
				});
			}, function(err) {
				return all_cb(err, files);
			});
		});
		
	};
	return {
		thumbnails: {
			make_thumbs: make_thumbs,
			upload_save: function(Img, cdn, file, base_name, variant, cb) {
				//var uploader = cdn.create();
				var sizes = {};
				var errors = [];
				var images = make_thumbs(file, base_name, variant, function(err, image) {
					uploader.upload({
						container: cdn.container,
						remote: image.filename,
						local: image.endfilepath,
					}, function(err) {
						if(err) {
							errors.push({error: err, file: image.endfilepath});
							return;
						}
						console.info(cdn.server_url + "/" + image.filename);
						sizes[image.size] = cdn.server_url + "/" + image.filename;
					})
				}, function(err, all) {
					if(err) return cb(err);
					var img = new Img();
					img.filename = base_name;
					img.sizes = sizes;
					img.save(function(err2) {
						if (err2) return cb(err2);
						cb(null, img);
					});
				});
			},
			get_size: function(Img, img_id, sizename) {
				var result = null;
				Img.findById(img_id, function(err, img){
					if(err) return;
					if(!img) return;
					result = img.sizes[sizename];
				})
				return result;
			}
		}
	};
};