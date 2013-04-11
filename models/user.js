var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , crypto = require('crypto');

var UserSchema = new Schema({
	name: String,
	username: String,
	email: String,
	hashed_password: String,
	salt: String,
	verifyToken: String,
	createdAt: Date,
	lastLogin: Date,
});

UserSchema.virtual('password').set(function(password){
	this._password = password;
	this.salt = this.makeSalt();
	this.hashed_password = this.encryptPassword(password);
}).get(function(){
	return this._password;
});

var validatePresenceOf = function(value) {
	return value && value.length;
}

UserSchema.pre('save', function(next) {
	if(!this.isNew) return next();
	if(!validatePresenceOf(this.password)) {
		next(new Error('Invalid Password'));
	} else {
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
	}
}

mongoose.model('User', UserSchema)