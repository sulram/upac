var mongoose = require('mongoose')
  , ObjectId = mongoose.Schema.ObjectId
  , Schema = mongoose.Schema;

var AttachmentSchema = new Schema({
	owner: {type:ObjectId, ref:'Article'},
	cdn_id: String,
	url: String,
	filename: String,
	size: Number,
	createdAt: Date,
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
	attachments: [{type:ObjectId, ref:'Attachment'}],
	publicationStatus: String,
	publicationDate: Date,
	createdAt: Date,
	updatedAt: Date,
});

var slugify = function(str) {
	str = str.toLowerCase();
	str = str.replace(/[àáâãä]/ig, 'a');
	str = str.replace(/[éêë]/ig, 'e');
	str = str.replace(/[íï]/ig, 'i');
	str = str.replace(/[óôõö]/ig, 'o');
	str = str.replace(/[úü]/ig, 'u');
	str = str.replace(/ç/ig, 'c');
	str = str.replace(/ñ/ig, 'n');
	str = str.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
	str = str.replace(/-/ig, '_');
	str = str.replace(/\s/ig, '-');
	return str;
}
ArticleSchema.pre('save', function(next) {
	if(this.isNew) {
		this.createdAt = new Date();
	}
	if(!this.slug || '' == this.slug || this.id == this.slug) {
		if(this.title && this.title.length > 0) {
			this.slug = slugify(this.title);
		} else {
			this.slug = this.id;
		}
	}
	next();
});
mongoose.model('Attachment', AttachmentSchema);
mongoose.model('Article', ArticleSchema);