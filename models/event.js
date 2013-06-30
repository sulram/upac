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
	geo: {type:[Number], index:"2dSphere"},
	questions: [QuestionSchema],
	resposnes: [RSVPSchema]
});

EventSchema.methods = {
	findInRadius: function(place, radius, cb) {
		return this.model('Event').find({geo: {
			$nearSphere: place,
			$maxDistance: radius
		}}, cb);
	},
}

mongoose.model('Event', EventSchema);