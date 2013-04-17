var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var TagSchema = new Schema({
	name: {
		type: String,
		index: {
			unique: true,
		}
	},
	slug: {
		type: String,
		index: {
			unique: true
		}
	},
	refcount: Number,
	type: String,
	relatives: [{type:ObjectId, ref:'Tag'}]
});

TagSchema.methods = {
	addRef: function() { this.refcount += 1; this.save(); },
	rmRef: function() { this.refcount -= 1; this.save(); }
}

mongoose.model('Tag', TagSchema);