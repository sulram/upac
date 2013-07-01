
/**
 * Module dependencies.
 */

var express = require('express')
  //, connect_form = require('connect-form')
  , _ = require('underscore')
  , fs = require('fs')
  , env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , auth = require('./helpers/auth')(_)
  , crypto = require('crypto')
  , paginate = require('./helpers/paginate')(_)
  , mailer = require('./helpers/mailer')(config.mailer_config)
  , marked = require('marked');

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
		if(err) return done(err);
		done(null, user);
	});
});

passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({$or:[{username: username.toLowerCase()}, {email:username.toLowerCase()}]}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {message: 'Usuário ou senha incorretos'});
			}
			if (!user.authenticate(password)) {
				return done(null, false, {message: 'Usuário ou senha incorretos'});
			}
			user.lastLogin = new Date();
			user.save(function(err) {
				if (err) return done(err);
				done(null, user);
			});
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
app.use(express.cookieSession({
	secret:config.secret,
	cookie: {
		//secure: true,  // só quando habilitar HTTPS
		maxAge: 48*60*60*1000, // 48 horas
		httpOnly: true
	}
}))
app.use(passport.initialize());
app.use(passport.session());
//app.use(connect_form({keepExtensions: true}));
marked.setOptions({
	gfm: true,
	tables: true,
	breaks: true,
	sanitize: true,
	pedantic: false
});
app.locals.md = function(text) {// helpers for the jade view engine
	return marked(text||"");
}
app.locals.pagination_helper = function(pagination) {
	var pages = [];
	if(pagination.limit > 0) {
		for(var i = 0; i <= Number(pagination.count); i+= Number(pagination.limit)) {
			pages.push({from:i, limit:pagination.limit, sort_by:pagination.sort_by, order:pagination.order});
		}		
	}
	return pages;
}
app.use(function(req, res, next){ // admin and json extension middleware
	var flash = null;
	req.image_config = config.image_config;
	req.isAdmin = function() {
		return (req.user && req.user.admin) || config.everyone_is_admin;
	};
	res.addJFlash = function(type, msg) {
		if (!flash) {
			flash = {flash:[]};
		}
		var obj = {};
		obj[type] = msg;
		flash.flash.push(obj);
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
	res.jsonxf = function(code, flashlist, data) {
		flash = {flash:flashlist};
		res.jsonx(code, data);
	};
	next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}
app.use(function(req, res, next) {
	res.status(404).render('404', {page: req.url})
});
var cdn = require('./helpers/cdn.js')(config);

/*var cdn = {
	server_url: config.cdn_server_url,
	container: config.cdn_container,
	create: function() {
		return require('pkgcloud').storage.createClient(config.cdn);
	}
}*/

require('./config/routes')(app, passport, auth, cdn, paginate, mailer);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
