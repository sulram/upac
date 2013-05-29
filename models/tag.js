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
			unique: true,
		}
	},
	refcount: Number,
	type: String,
	relatives: [{type:ObjectId, ref:'Tag'}]
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

TagSchema.pre('save', function(next){
	if(!this.slug || '' == this.slug || this.id == this.slug) {
		if(this.name && this.name.length > 0) {
			var slugified = slugify(this.name);
			
			this.slug = slugified;
		} else {
			this.slug = this.id;
		}
	}
	next();
});
TagSchema.path('slug').validate(function(slug){
	return /[a-z0-9-_]+/.test(slug);
});
TagSchema.methods = {
	addRef: function() { this.update({$incr:{refcount: 1}}, function(err) { if (err) console.error("Erro ao subir refcount da tag %s", this.id)}); },
	rmRef: function() { this.update({$decr:{refcount: 1}}, function(err) { if (err) console.error("Erro ao descer refcount da tag %s", this.id)}); }
}

mongoose.model('Tag', TagSchema);