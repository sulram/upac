module.exports = function(image_config, _){
	var gm = require('gm');
	var make_thumbs =  function(file, tempdir, base_name) {
		var files = [];
		var errors = [];
		_.each(image_config.sizes, function(sizename, size){
			var endfilename = basename + '-' + size.w + 'x' + size.h + '.' + image_config.format;
			var endfilepath = tempdir + '/' + endfilename;
			gm(file).resize(size.w, size.h, "px").write(endfilename, function(err){
				if(err) return errors.push({file: endfilename, error:err});
				files.push({size: sizename, filename: endfilename, path:endfilepath});
			})
		});
		return {files: files, errors: errors};
	};
	return {
		thumbnails: {
			make_thumbs: make_thumbs,
			upload_save: function(Img, cdn, file, tempdir, base_name) {
				var img = new Img();
				var images = make_thumbs(file, tempdir, base_name);
				if(images.errors.length > 0) {
					return {errors: images.errors};
				}
				var uploader = cdn.create();
				var sizes = {};
				var errors = [];
				_.each(images.files, function(index, iimage){
					uploader.upload({
						container: cdn.container,
						remote: iimage.filename,
						local: iimage.endfilepath,
					}, function(err) {
						if(err) {
							errors.push({error: err, file:iimage.endfilepath})
							return;
						}
						sizes[iimage.size] = cdn.server_url + '/' + iimage.filename;
					});
				});
				if(errors.length > 0) {
					return {errors: errors};
				}
				img.filename = base_name;
				img.sizes = sizes;
				img.save(function(err) {
					if(err) errors.push({error: err});
				});
				return {image:img, errors:errors};
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