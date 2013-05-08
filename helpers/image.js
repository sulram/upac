module.exports = function(image_config, _){
	var gm = require('gm'),
		temp = require('temp');
	var make_thumbs =  function(file, base_name, file_cb, all_cb) {
		temp.mkdir('upac-thumbnails', function(err, tempdir) {
			if(err) return all_cb(err);;
			var files = [];	
			var errors = [];
			_.each(image_config.sizes, function(sizename, size){
				var endfilename = base_name + '-' + size.w + 'x' + size.h + '.' + image_config.format;
				var endfilepath = tempdir + '/' + endfilename;
				gm(file).resize(size.w, size.h, "px").write(endfilename, function(err){
					if(err) return file_cb(err);
					
					files.push({size: sizename, filename: endfilename, path:endfilepath});
					file_cb(null, {size: sizename, filename: endfilename, path:endfilepath});
				});
			});
			return all_cb(null, files);
		})
		
	};
	return {
		thumbnails: {
			make_thumbs: make_thumbs,
			upload_save: function(Img, cdn, file, base_name, cb) {
				var img = new Img();
				var uploader = cdn.create();
				var sizes = {};
				var errors = [];
				var images = make_thumbs(file, base_name, function(err, image) {
					uploader.upload({
						container: cdn.container,
						remote: image.filename,
						local: image.endfilepath,
					}, function(err) {
						if(err) {
							errors.push({error: err, file: image.endfilepath});
							return;
						}
						sizes[image.size] = cdn.server_url + "/" + image.filename;

					})
				}, function(err, all) {
					if(err) return cb(err);
					img.filename = base_name;
					img.sizes = sizes;
					img.save(function(err) {
						if (err) return cb(err);
						cb(null, img);
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