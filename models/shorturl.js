var mongoose = require('mongoose')
  , ObjectId = mongoose.Schema.ObjectId
  , Schema = mongoose.Schema
  , crypto = require('crypto');

var ShortUrlSchema = new Schema({
	destination: {type:String, index:true, required:true},
	hash: {type:String, index: true, required:true},
	hits: {type:Number, default: 0},
})

ShortUrlSchema.statics.makeShortUrl = function(url, cb) {
	var shortened = new (mongoose.model('ShortUrl'))();
	shortened.destination = url;
	shortened.hash = ((new Date()).getTime()-(new Date("2013 08 06, 12:00:00")).getTime()+Math.round(Math.random()*256)).toString(36);
	shortened.save(function(err) {
		if (err) return cb(err);
		cb(null, shortened);
	});
}

mongoose.model('ShortUrl', ShortUrlSchema);