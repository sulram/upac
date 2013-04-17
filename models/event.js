var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var QuestionSchema = new Schema({
	text: String,
});

var RSVPSchema = new Schema({
	user: {type: ObjectId, ref:'User'},
	going: String,
	responses: [String],
	respondedAt: Date
})

var EventSchema = new Schema({
	parent: {type: ObjectId, ref:'Event'},
	article: {type: ObjectId, ref:'Article'},
	owners: [{type: ObjectId, ref:'User'}],
	startDate: Date,
	endDate: Date,
	geo: {type:[Number], index:"2d"},
	questions: [QuestionSchema],
	resposnes: [RSVPSchema]
});

mongoose.model('Event', EventSchema);