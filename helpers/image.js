module.exports = function(image_config, _){
	var gm = require('gm');
	return {
		thumbnails: {
			make: function(file, tempdir, base_name) {
				var files = [];
				var errors = [];
				_.each(image_config.sizes, function(sizename, size){
					var endfilename = tempdir + '/' + basename + '-' + size.w + 'x' + size.h + '.' + image_config.format;
					gm(file).resize(size.w, size.h, "px").write(endfilename, function(err){
						if(err) return errors.push({file: endfilename, error:err});
						files.push(endfilename);
					})
				});
				return {files: files, errors: errors};
			},
			get_size: function(img_id, sizename) {

			}
		},
	};
};