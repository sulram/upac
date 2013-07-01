var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , crypto = require('crypto')
  , _ = require('underscore');

var UserSchema = new Schema({
	name: String,
	avatar: {
		type:ObjectId,
		ref: 'Img'
	},
	username: {
		type: String, 
		index: {
			unique: true
		},
		set: function(v) {
			return v.toLowerCase();
		}
	},
	email: {
		type: String,
		set: function(v) {
			return v.toLowerCase();
		},
		index:  {
			unique: true
		}
	},
	geo: {type: [Number], index: "2d"},
	hashed_password: String,
	salt: String,
	verifyToken: String,
	resetPasswordToken: String,
	resetPasswordRequestTime: Date,
	provider: String,
	createdAt: Date,
	lastLogin: Date,
	dateOfBirth: Date,
	city: String,
	state: String,
	country: String,
	about: String,
	gender: String,
	image: {type: ObjectId, ref:'Img', set:function(newimg){
		if(this.image) {
			var Img = mongoose.model('Img');
			Img.remove({_id: this.image});
		}
		return newimg;
	}},
	admin: {
		type: Boolean,
		default: false
	},
	tags: [{
		type: ObjectId,
		ref: "Tag"
	}]
});

UserSchema.virtual('password').set(function(password){
	this._password = password;
	this.salt = this.makeSalt();
	this.hashed_password = this.encryptPassword(password);
}).get(function(){
	return this._password;
});

UserSchema.path('username').validate(function(username) {
	return /[a-z0-9]{3,}/.test(username);
}, 'invalid').validate(function(username, cb) {
	mongoose.model('User').find({username: username.toLowerCase()}, function(err, users) {
		cb(err||users.length===0);
	})
}, 'inuse');;

var emailregex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i

UserSchema.path('email').validate(function(email){
	return emailregex.test(email);
}, 'invalid').validate(function(email, cb) {
	mongoose.model('User').find({email: email.toLowerCase()}, function(err, users) {
		cb(err||users.length===0);
	})
}, 'inuse');

var validatePresenceOf = function(value) {
	return value && value.length;
}

UserSchema.pre('save', function(next) {
	if(!this.isNew) {
		return next();
	} else {
		this.createdAt = new Date();
	}
	if(!validatePresenceOf(this.password)) {
		next(new Error('Invalid Password'));
	} else {
		this.lastUpdate = new Date();
		next();
	}
});

UserSchema.methods = {
	authenticate: function(password) {
		return (this.encryptPassword(password) === this.hashed_password);
	},
	makeSalt: function() {
		return (Math.round(new Date().valueOf() * Math.random()))+'';
	},
	encryptPassword: function(password) {
		if(!password) return ''
		return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
	},
	toJSON: function() {
		return _.omit(this.toObject(), 'hashed_password', 'salt', 'verifyToken', 'provider');
	}
}

UserSchema.statics.findByTagId = function(id, options, cb) {
	this.find({tags: id}, null, options, cb);
}

mongoose.model('User', UserSchema)