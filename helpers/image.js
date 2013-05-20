module.exports = function(config, _){
	var gm = require('gm'),
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
	return {
		thumbnails: {
			make_thumbs: make_thumbs,
			upload_save: function(Img, cdn, file, base_name, variant, cb) {
				var uploader = cdn.create();
				var sizes = [];
				var errors = [];
				var images = make_thumbs(file, base_name, variant, function(err, image) {
					if(err) {
						return cb(err);
					}
					uploader.upload({
						container: cdn.container,
						remote: image.filename,
						local: image.path,
					}, function(err) {
						if(err) {
							errors.push({error: err, file: image.path});
							return;
						}
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
						img.filename = base_name;
						img.sizes = sizes;
						img.save(function(err2) {
							if (err2) return cb(err2);
							cb(null, img);
						});

					})
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