module.exports = function(app, passport, auth, cdn) {

	
	var user = require('../controllers/user.js')(cdn);
	var article = require('../controllers/article.js')(cdn);
	var _event = require('../controllers/event.js')(cdn);

	//app.get('/login', user.login);
	app.get('/logout', user.logout);

	app.get('/verify/:token', user.verify);

	app.all('/users', user.index);
	app.post('/user', user.create);
	app.post('/user/session', passport.authenticate('local'), user.login);

	app.put('/user/:id', auth.requiresLogin, auth.user.hasAuthorization, user.update);
	app.get('/user/:username', user.show);
	app.get('/user/:username/articles', article.byUser);

	app.all('/article', article.index);
	app.get('/article/new', auth.requiresLogin, article.create);
	app.post('/article', auth.requiresLogin, article.create);
	app.get('/article/find/:slug', article.bySlug);
	app.get('/article/:id', article.show);
	app.put('/article/:id', auth.requiresLogin, auth.article.hasAuthorization, article.update);
	app.del('/article/:id', auth.requiresLogin, auth.article.hasAuthorization, article.remove);

	app.get('/', function(req, res) { res.render('index'); });

}