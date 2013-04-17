
/**
 * Module dependencies.
 */

var express = require('express')
	, _ = require('underscore')
	, fs = require('fs')
	, env = process.env.NODE_ENV || 'development'
	, config = require('./config/config')[env]
	, http = require('http')
	, path = require('path')
	, mongoose = require('mongoose')
	, passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy
	, auth = require('./helpers/auth')
	, crypto = require('crypto');

var app = express();

// connect to mongodb instance, then initialize models
mongoose.connect(config.db);

var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function(file) {
	require(models_path+'/'+file);
});

var User = mongoose.model('User');
passport.serializeUser(function(user, done) {
	done(null, user.email);
});

passport.deserializeUser(function(email, done) {
	User.findOne({email:email}, function(err, user) {
		done(err, user);
	});
});

passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({username: username}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				User.findOne({email:username}, function(err, user) {
					if(err) return done(err);
					if(!user) return done(null, false, {message: 'Usuário ou senha incorretos'});
					user.lastLogin = new Date();
					user.save(function(err) {
						if (err) return done(err);
						return done(null, user);
					});
				});
				return;
			}
			if (!user.authenticate(password)) {
				return done(null, false, {message: 'Usuário ou senha incorretos'});
			}
			user.lastLogin = new Date();
			user.save(function(err) {
				if (err) return done(err);
				return done(null, user);
			})
		});
	}
));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret:config.secret}))
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){ // json extension middleware
	var flash = {};
	res.addJFlash = function(type, msg) {
		flash[type] = msg;
	};
	res.jsonx = function(obj) {
		var code = 200;
		if(2 == arguments.length) {
			if('number' == typeof arguments[1]) {
				code = arguments[1];
			} else {
				code = obj;
				obj = arguments[1];
			}
		}
		var auth = {
			id: req.isAuthenticated() ? req.user.id : null,
			loggedIn: req.isAuthenticated(),
			username: req.isAuthenticated() ? req.user.username : null
		};
		res.json(code, _.extend({auth: auth}, flash, obj));
	};
	next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}
var cdn = function() {
	return require('pkgcloud').storage.createClient(config.cdn);
}
require('./config/routes')(app, passport, auth, cdn);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
