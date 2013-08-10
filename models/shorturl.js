var mongoose = require('mongoose')
  , ObjectId = mongoose.Schema.ObjectId
  , Schema = mongoose.Schema
  , crypto = require('crypto');

var ShortUrlSchema = new Schema({
	destination: {type:String, index:true, required:true},
	object: {type:ObjectId},
	hash: {type:String, index: true, required:true},
	hits: {type:Number, default: 0},
})

var makehash = function(num) {
	var indextable = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var len = indextable.length;
	num = Math.floor(Number(num));
	var result = ""
	while(num > 0) {
		var cur = num % len;
		result = indextable.charAt(cur) + result;
		num = (num - cur) / len;
	}
	return result;
}
ShortUrlSchema.statics.makeShortUrl = function(id, created, url, cb) {
	var shortened = new (mongoose.model('ShortUrl'))();
	shortened.object = id;
	shortened.destination = url;
	var id_str = id.toString();
	shortened.hash = makehash(Number(created)-Number(new Date('2013 06 01 12:00:00'))); // make a hash based on the creation date, minus the application's initial date
	shortened.save(function(err) {
		if (err) return cb(err);
		cb(null, shortened);
	});
}

mongoose.model('ShortUrl', ShortUrlSchema);