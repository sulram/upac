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
	startDate: Date,
	endDate: Date,
	questions: [QuestionSchema],
	resposnes: [RSVPSchema]
});

mongoose.model('Event', EventSchema);