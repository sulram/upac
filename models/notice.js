var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var NoticeSchema = new Schema({
	owner: {type: ObjectId, ref:'User'},
	createdAt: Date,
	order: Number,
	//geo: {type:[Number], index:"2d"},
	text: String,
	url: String,
	image: {type: ObjectId, ref:'Img'},
	//replies: [{type: ObjectId, ref:'Notice'}]
});

NoticeSchema.methods = {
	getLast: function(params, cb) {
		var skip = params.skip || 0;
		var limit = params.limit || 50;
		this.find({}).sort('date',-1).skip(skip).limit(limit).exec(cb);
	},
	getFromUserID: function(user_id, params, cb) {
		var skip = params.skip || 0;
		var limit = params.limit || 50;
		this.find({owner: user_id}).sort('date',-1).skip(skip).limit(limit).exec(cb);
	}
}
NoticeSchema.pre('save', function(next) {
	if(this.isNew) {
		this.createdAt = new Date();
	}
	next();
});
mongoose.model('Notice', NoticeSchema);