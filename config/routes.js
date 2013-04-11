module.exports = function(app, passport, auth) {

	app.get('/', function(req, res) { res.render('index'); });
	
	var user = require('../controllers/user.js');
	app.get('/login', user.login);
	app.get('/logout', user.logout);
	app.post('/user/create', user.create);
	app.get('/user/session', passport.authenticate('local'));

	var article = require('../controllers/article.js');
	app.get('/article/:slug', article.bySlug);
}