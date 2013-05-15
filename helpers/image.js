module.exports = function(config, _){
	var //gm = require('gm'),
		image_config = config.image_config,
	    Imager = require('imager'),
	    imager = new Imager({
	    	variants: image_config.variants,
	    	storage: (function(cfg) {
	    		if (cfg.cdn.provider == "amazon") {
	    			return {S3: {
	    				key: cfg.cdn.keyId,
	    				secret: cfg.cdn.key,
	    				bucket: cfg.cdn_container
	    			}}
	    		} else if (cfg.provider == "rackspace") {
	    			return {Rackspace: {
	    				auth: {
	    					username: cfg.cdn.username,
	    					apiKey: cfg.cdn.apiKey,
	    				},
	    				container: cfg.cdn_container,
	    			}}
	    		}
	    	})(config),
	    	debug: true,
	    }, {amazon:"S3", rackspace:"Rackspace"}[config.cdn.provider]),
		temp = require('temp');
	var make_thumbs =  function(file, variant, file_cb, all_cb) {
	//var make_thumbs =  function(file, base_name, variant, file_cb, all_cb) {
		//temp.mkdir('upac-thumbnails', function(err, tempdir) {
			//if(err) return all_cb(err);;
			//console.log(tempdir);
			var files = [];	
			var errors = [];
			imager.upload(file, function(err, cdn_file, files) {
				if(err) console.error(err);
				console.log(cdn_file);
				console.log(files);
			}, variant);
				/*
			_.each(image_config.sizes, function(sizename, size){
				var endfilename = base_name + '-' + size.w + 'x' + size.h + '.' + image_config.format;
				//var endfilepath = tempdir + '/' + endfilename;
				var endfilepath = temp.path({suffix:image_config.format});
				gm(file).resize(size.w, size.h, "px").write(endfilepath, function(err){
					if(err) return file_cb(err);
					files.push({size: sizename, filename: endfilename, path:endfilepath});
					file_cb(null, {size: sizename, filename: endfilename, path:endfilepath});
				});
			
			});
			*/
			return all_cb(null, files);
		//})
		
	};
	return {
		thumbnails: {
			make_thumbs: make_thumbs,
			upload_save: function(Img, cdn, file, variant, cb) {
				//var uploader = cdn.create();
				var sizes = {};
				var errors = [];
				var images = make_thumbs(file, variant, function(err, image) {
					/*uploader.upload({
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

					})*/
				}, function(err, all) {
					if(err) return cb(err);
					var img = new Img();
					img.filename = base_name;
					img.sizes = sizes;
					img.save(function(err2) {
						if (err2) return cb(err2);
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