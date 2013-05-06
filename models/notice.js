var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var NoticeSchema = new Schema({
	owner: {type: ObjectId, ref:'User'},
	createdAt: Date,
	geo: {type:[Number], index:"2d"},
	text: String,
	replies: [{type: ObjectId, ref:'Notice'}]
});


mongoose.model('Notice', NoticeSchema);