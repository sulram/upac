var mongoose = require('mongoose')
  , ObjectId = mongoose.Schema.ObjectId
  , Schema = mongoose.Schema
  , crypto = require('crypto');

var AttachmentSchema = new Schema({
	owner: {type:ObjectId, ref:'Article'},
	cdn_id: String,
	url: String,
	filename: String,
	size: Number,
	createdAt: Date,
});

var ImageRefSchema = new Schema({
	image: {type: ObjectId, ref:'Img'},
	size: String
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
	geo: {type: [Number], index: "2dsphere"},
	parent: {type:ObjectId, ref:'Article'}, // Article
	tags: [{
		type: ObjectId,
		ref: 'Tag'
	}],
	references: [String],
	images: [ImageRefSchema],
	featuredImage: {type: ObjectId, ref:'Img'},
	attachments: [{type:ObjectId, ref:'Attachment'}],

	tags: [{type:ObjectId, ref:'Tag'}],
	publicationStatus: String,
	publicationDate: Date,
	createdAt: Date,
	updatedAt: Date,
});

var PageSchema = new Schema({
	title: String,
	slug: {
		type: String,
		index: {unique: true}
	},
	content: String,
	images: [ImageRefSchema],
	attachments: [{type:ObjectId, ref:'Attachment'}],
	publicationStatus: String,
	publicationDate: Date,
	createdAt: Date,
	updatedAt: Date,
})

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
	mongoose.model('Article').find({slug: {}})
	this.updatedAt = new Date();
	next();
});

PageSchema.pre('save', function(next) {
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
	this.updatedAt = new Date();
	var thisart = this;
	mongoose.model('Article').findOne({slug: this.slug}, function(err, article){
		if(err) return next(err);
		if(article) this.slug += '-'+crypto.randomBytes(5).toString('hex'); // se der conflito vai ser muita cagada
		next();
	})
})

ArticleSchema.statics.findByTagId = function(id, options, cb) {
	this.find({tags: id}, null, options, cb);
}
mongoose.model('Attachment', AttachmentSchema);
mongoose.model('Article', ArticleSchema);
mongoose.model('Page', PageSchema)