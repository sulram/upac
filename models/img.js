var mongoose = require('mongoose')
  , ObjectId = mongoose.Schema.ObjectId
  , Schema = mongoose.Schema;

var ImgSizeSchema = new Schema({
	size: String,
	cdn_id: String,
	cdn_url: String
});

var ImgSchema = new Schema({
	owner: {type: ObjectId, ref: 'User'},
	articles: [{type: ObjectId, ref: 'Article'}],
	filename: String,
	cdn_id: String,
	sizes: [ImgSizeSchema]
});

mongoose.model('Img', ImgSchema);