var mongoose = require('mongoose')
  , ObjectId = mongoose.Schema.ObjectId
  , Schema = mongoose.Schema;


var ArticleSchema = new Schema({
	owners: [ObjectId], // Users
	title: String,
	slug: {
		type: String,
		index: {
			unique: true
		}
	},
	content: String,
	geo: {type: [Number], index: "2d"},
	parent: ObjectId, // Article
	publicationDate: Date,
	createdAt: Date,
	updatedAt: Date,
});

mongoose.model('Article', ArticleSchema);