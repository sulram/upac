var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var TagSchema = new Schema({
	name: String,
	slug: String,
	relatives: [{type:ObjectId, ref:'Tag'}]
});

mongoose.model('Tag', TagSchema);