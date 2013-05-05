module.exports = function(app, passport, auth, cdn, img) {

	
	var user = require('../controllers/user.js')(cdn, img);
	var article = require('../controllers/article.js')(cdn, img);
	var _event = require('../controllers/event.js')(cdn);
	var tag = require('../controllers/tag.js')(cdn);

	//app.get('/login', user.login);
	app.get('/logout', user.logout);

	app.get('/verify/:token', user.verify);

	app.all('/users', user.index);
	app.post('/user', user.create);
	app.post('/user/session', passport.authenticate('local'), user.login);

	app.put('/user/:id', auth.requiresLogin, user.preloadById, auth.user.hasAuthorization, user.update);
	app.get('/user/:username', user.show);
	app.get('/user/:username/articles', article.byUser);
	app.post('/user/:id/updateimage', auth.requiresLogin, user.preloadById, auth.user.hasAuthorization, user.setImage);

	app.all('/article', article.index);
	app.get('/article/new', auth.requiresLogin, article.create);
	app.get('/article/find/:slug', article.bySlug);
	app.get('/article/:id', article.show);
	app.put('/article/:id', auth.requiresLogin, article.preloadById, auth.article.hasAuthorization, article.update);
	app.del('/article/:id', auth.requiresLogin, article.preloadById, auth.article.hasAuthorization, article.remove);
	app.get('/article/:id/images', article.getImages);
	app.get('/article/:id/attachments', article.getAttachments);

	// route for testing uploads to the CDN server
	app.post('/uploadtest', article.uploadTest);

	app.post('/tag/new', auth.requiresLogin, tag.create);
	app.get('/tag/:id', tag.show);
	app.get('/tag/find/:slug', tag.bySlug);
	app.put('/tag/:id', auth.requiresLogin, tag.preloadById, /* auth.tag.hasAuthorization, */ tag.update);

	app.get('/event/new', auth.requiresLogin, _event.create);
	app.get('/event/:id', _event.show);
	app.del('/event/:id', auth.requiresLogin, _event.preloadById, auth.event.hasAuthorization, _event.remove);

	app.get('/events/near', _event.near);

	app.get('/events/happening', _event.happening);
	app.get('/events/past', _event.past);
	app.get('/events/future', _event.future);
	


	app.get('/', function(req, res) { res.render('index'); });

}