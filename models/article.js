var mongoose = require('mongoose')
  , ObjectId = mongoose.Schema.ObjectId
  , Schema = mongoose.Schema;

var AttachmentSchema = new Schema({
	cdn_id: String,
	url: String,
	filename: String,
});

var ArticleSchema = new Schema({
	owners: [{
		type:ObjectId,
		ref: 'User'
	}],
	title: String,
	slug: {
		type: String,
		index: {
			unique: true
		}
	},
	excerpt: String,
	content: String,
	geo: {type: [Number], index: "2d"},
	parent: {type:ObjectId, ref:'Article'}, // Article
	tags: [{
		type: ObjectId,
		ref: 'Tag'
	}],
	references: [String],
	images: [{type:ObjectId, ref:'Img'}],
	attachments: [AttachmentSchema],
	publicationStatus: String,
	publicationDate: Date,
	createdAt: Date,
	updatedAt: Date,
});

mongoose.model('Article', ArticleSchema);