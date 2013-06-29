var mongoose = require('mongoose')
  , ObjectId = mongoose.Schema.ObjectId
  , Schema = mongoose.Schema
  , gm = require('gm')
  , _ = require('underscore')
  , temp = require('temp');

var Img;
var ImgSizeSchema = new Schema({
	size: String,
	cdn_id: String,
	cdn_url: String
});

var create_img;
var ImgSchema = new Schema({
	uploader: {type: ObjectId, ref: 'User'},
	filename: String,
	cdn_id: String,
	original_cdn_url: String,
	variant: String,
	sizes: [ImgSizeSchema],
	upload_complete: Boolean,
	createdAt: Date
});

var make_thumbs =  function(file, _base_name, image_config, _variant, file_cb, all_cb) {
	console.info('preparando thumbs. base name: %s', _base_name);
	var base_name = _base_name;
	var variant = _variant;
	temp.mkdir('upac-thumbnails', function(err, tempdir) {
		if(err) return all_cb(err);
		console.log('temp dir: %s, base name: %s', tempdir, base_name);
		var files = new Array();	
		var errors = new Array();
		if(!image_config || !image_config.format) return all_cb({error: "formato dos thumbnails das imagens não especificado"});
		if(!image_config || (!image_config.variants) || (image_config.variants.length == 0)) return all_cb({error: "nenhuma variante configurada para criar os thumbnails."});
		if(!image_config.variants[variant]) return all_cb({error:"variante especificada '"+variant+"' não configurada"});
		//console.log("variants: %j", image_config.variants[variant]);
		var l = Object.keys(image_config.variants[variant]).length;
		console.log(l);
		var call_cb = _.after(l, function() {
			all_cb(null,files);
		});
		_.each(image_config.variants[variant], function(size, sizename) {
			//console.log("imagem: %s tamanho: %s -> %j", base_name, sizename, size);
			var endfilename = base_name + '_' + sizename + '.' + image_config.format;
			var endfilepath = temp.path({suffix:"."+image_config.format});
			var gm_oper = gm(file).gravity("Center");
			_.each(size.ops,function(op) {
				switch(op) {
					case 'crop':
						gm_oper = gm_oper.crop(size.w, size.h);
						break;
					case 'resize-crop':
						gm_oper = gm_oper.geometry(size.w, size.h,"^").crop(size.w, size.h);
						break;
					case 'resize-inner':
						gm_oper = gm_oper.resize(size.w, size.h);
						break;
					case 'resize-outer':
						gm_oper = gm_oper.geometry(size.w, size.h,"^")
						break;
				}
			})
			gm_oper.quality(image_config.quality).write(endfilepath, function(err){
				if(err) return file_cb(err, {size: sizename, filename: endfilename, path:endfilepath});
				console.log("resize na imagem %s para o formato %s feito.", file, sizename);
				files.push( {size: sizename, filename: endfilename, path:endfilepath} );
				file_cb(null, {size: sizename, filename: endfilename, path:endfilepath}, call_cb);
			});
		});
	});
	
};
ImgSchema.statics.upload = function(cdn, image_config, user_id, orig_name, file_name, base_name, variant, cb) {
	var uploader = cdn.create();
	var errors = [];
	var _user_id = user_id;
	var _variant = variant;
	var _file_name = file_name;
	var callb = cb;
	var file_pieces = orig_name.split('/');
	file_pieces = file_pieces[file_pieces.length - 1].split('\\');

	var createdAt = new Date();
	var _base_name = base_name+ '-'+createdAt.getTime();
	
	var original_url = _base_name+'-original-'+file_pieces[file_pieces.length-1];

	console.log(original_url);
	uploader.upload({
		container: cdn.container,
		remote: original_url,
		local: file_name
	}, function(err, data) {
		if (err && err.statusCode && (err.statusCode != 200)){
			return cb({
				msg: 'Could not upload file to CDN',
				error: err,
				data: data
			});
		}
		var img = new Img({
			uploader: _user_id,
			filename: _base_name,
			original_cdn_id: original_url,
			original_cdn_url: cdn.server_url + original_url,
			variant: variant,
			upload_complete: false,
			sizes:new Array(),
			createdAt: createdAt,
		});
		var __user_id = _user_id;
		var __base_name = _base_name;
		var __variant = _variant;
		var __file_name = _file_name;
		var _callb = callb;
	
		img.save(function(err) {
			if(err) {return _callb(err);}
			_callb(null, img); // callback com infos temporárias - upload é feito em seguida
			make_thumbs(__file_name, __base_name + '-thumb-' + file_pieces[file_pieces.length-1], image_config, __variant, function(err, image, complete_) {
				if(err) return _callb(err);
				var complete_cb = complete_;
				console.log("fazendo upload de %s", image.filename);
				uploader.upload({
					container: cdn.container,
					remote: image.filename,
					local: image.path,
				}, function(err) {
					if(err) { errors.push({error: err, file: image.path}); return; }
					console.info("arquivo final: " + cdn.server_url + image.filename);
					img.sizes.push( {
						size: image.size,
						cdn_id: image.filename,
						cdn_url: cdn.server_url + image.filename
					});
					//console.info("complete: %s", complete_cb)
					complete_cb();
				});
			}, function(err, all) {
				if(err) {
					console.info("errors: %j", err);
					return _callb(err);	
				}
				console.info("arquivos subidos.");
				img.upload_complete = true;
				img.save(function(err2) {
					if (err2) return _callb(err2);
					console.info("imagem salva no banco de dados.");
				});
			});
		});
	});
	
}
ImgSchema.statics.uploadAndReplace = function(prev_id, cdn, image_config, user_id, orig_name, file_name, base_name, variant, cb) {
	return this.upload(cdn, image_config, user_id, orig_name, file_name, base_name, variant, function(err, image) {
		if(err) return cb(err, image);
		if((prev_id == null) || (prev_id == undefined)) {
			return cb(null, image);
		}
		Img.findByIdAndRemove(prev_id, function(err, oldimg) {
			if(oldimg) {
				var cdn_obj = cdn.create();
				_.each(oldimg.sizes, function(size) {
					console.info('deletando imagem %s', size.cdn_id);
					cdn_obj.remove({
						container: cdn.container,
						remote: size.cdn_id
					}, function(err) {

					});
				});
				if(oldimg.original_cdn_id) {
					cdn_obj.remove({
						container: cdn.container,
						remote: oldimg.original_cdn_id
					}, function(err) {

					});				
				}
			}
			cb(null, image);
		});
	})
}
ImgSchema.methods.getSize = function(variant) {
	return _.find(this.sizes, function(size){ return size.size == variant; });
}
ImgSchema.methods.replace = function(cdn, image_config, orig_name, file_name, base_name, variant, cb) {
	var uploader = cdn.create();
	var sizes = [];
	var errors = [];
	var callb = cb;
	var file_pieces = orig_name.split('/');
	file_pieces = file_pieces[file_pieces.length - 1].split('\\');

	var original_url = base_name+'-original-'+file_pieces[file_pieces.length-1];
	var oldimg = _.pick(this, 'sizes', 'original_cdn_id');

	console.log(original_url);
	uploader.upload({
		container: cdn.container,
		remote: original_url,
		local: file_name
	}, function(err, data) {
		if (err && err.statusCode && (err.statusCode != 200)){
			return cb({
				msg: 'Could not upload file to CDN',
				error: err,
				data: data
			});
		}
		this.set({
			filename: base_name,
			original_cdn_id: original_url,
			original_cdn_url: cdn.server_url + original_url,
			variant: variant,
			upload_complete: false,
			sizes: null
		});
		var img = this;
		this.save(function(err) {
			if(err) {return cb(err);}
			cb(null, img); // callback com infos temporárias - upload é feito em seguida
			_.each(oldimg.sizes, function(size) {
				console.info('deletando imagem %s', size.cdn_id);
				uploader.remove({
					container: cdn.container,
					remote: size.cdn_id
				}, function(err) {});
			});
			uploader.remove({
				container: cdn.container,
				remote: oldimg.original_cdn_id
			}, function(err) {});
			var images = make_thumbs(file_name, base_name, image_config, variant, function(err, image, complete_) {
				if(err) return cb(err);
				var complete_cb = complete_;
				uploader.upload({
					container: cdn.container,
					remote: image.filename,
					local: image.path,
				}, function(err) {
					if(err) { errors.push({error: err, file: image.path}); return; }
					sizes.push( {
						size: image.size,
						cdn_id: image.filename,
						cdn_url: cdn.server_url + image.filename
					});
					//console.info("complete: %s", complete_cb)
					complete_cb();
				});
			}, function(err, all) {
				if(err) {
					return callb(err);	
				}
				img.set({
					sizes: sizes,
					upload_complete:true
				});
				img.save(function(err2) {
					if (err2) return callb(err2);
				});
			});
		})
	});
}

var ArticleImgRefSchema = new Schema({
	img: {type: ObjectId, ref: 'Image'},
	article: {type: ObjectId, ref: 'Article'}
});

Img = mongoose.model('Img', ImgSchema);
mongoose.model('ArticleImgRef', ArticleImgRefSchema);

create_img = function() {
	return new Img();
}