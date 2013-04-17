var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , crypto = require('crypto');

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
		}
	},
	email: {
		type: String,
		index:  {
			unique: true
		}
	},
	geo: {type: [Number], index: "2d"},
	hashed_password: String,
	salt: String,
	verifyToken: String,
	provider: String,
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

var emailregex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i

UserSchema.path('email').validate(function(email){
	return emailregex.test(email);
}, 'Invalid E-mail');

var validatePresenceOf = function(value) {
	return value && value.length;
}

UserSchema.pre('save', function(next) {
	if(!this.isNew) {
		return next();
	} else {
		this.createdAt = new Date();
		// enviar email para o usuário com token de validação
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
		var obj = this.toObject();
		delete obj.hashed_password;
		delete obj.salt;
		delete obj.verifyToken;
		delete obj.provider;
		return obj;
	}
}

mongoose.model('User', UserSchema)