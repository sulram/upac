module.exports = function(app, passport, auth, cdn, paginate) {

	
	var user = require('../controllers/user')(cdn, paginate);
	var article = require('../controllers/article')(cdn, paginate);
	var _event = require('../controllers/event')(cdn, paginate);
	var tag = require('../controllers/tag')(cdn, paginate);
	var notice = require('../controllers/notice')(paginate);
	var admin = require('../controllers/admin');

	app.get('/admin', auth.requiresAdminLogin, function(req, res, next) {
		res.render('admin/index',{title:"Administração do site UPAC"})
	})
	app.get('/admin/signin', admin.signin);
	app.post('/admin/login', passport.authenticate('local'), user.login);
	app.all('/admin/logout', admin.logout);

	app.get('/admin/user/new', auth.requiresAdminLogin, user.admin.editnew);
	app.post('/admin/user/:id', auth.requiresAdminLogin, user.admin.update);
	app.get('/admin/user/:id', auth.requiresAdminLogin, user.admin.show);
	app.get('/admin/user/:id/edit', auth.requiresAdminLogin, user.admin.edit);
	app.get('/admin/user/:id/remove', auth.requiresAdminLogin, user.admin.remove);
	app.all('/admin/users', auth.requiresAdminLogin, user.admin.index);
	app.post('/admin/user', auth.requiresAdminLogin, user.admin.create);


	app.get('/admin/notice/new', auth.requiresAdminLogin, notice.admin.editnew);
	app.post('/admin/notice/:id', auth.requiresAdminLogin, notice.admin.update);
	app.get('/admin/notice/:id', auth.requiresAdminLogin, notice.admin.show);
	app.get('/admin/notice/:id/edit', auth.requiresAdminLogin, notice.admin.edit);
	app.get('/admin/notice/:id/remove', auth.requiresAdminLogin, notice.admin.remove);
	app.all('/admin/notices', auth.requiresAdminLogin, notice.admin.index);
	app.post('/admin/notice', auth.requiresAdminLogin, notice.admin.create);
	
	app.get('/admin/article/new', auth.requiresAdminLogin, article.admin.editnew);
	app.post('/admin/article/:id', auth.requiresAdminLogin, article.admin.update);
	app.get('/admin/article/:id', auth.requiresAdminLogin, article.admin.show);
	app.get('/admin/article/:id/edit', auth.requiresAdminLogin, article.admin.edit);
	app.get('/admin/article/:id/remove', auth.requiresAdminLogin, article.admin.remove)
	app.all('/admin/articles', auth.requiresAdminLogin, article.admin.index);
	app.post('/admin/article', auth.requiresAdminLogin, article.admin.create);


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
	//app.post('/uploadimagetest', user.uploadImageTest);

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
	

	app.all('/notices', notice.index);
	app.post('/notice/new', auth.requiresLogin, notice.create);
	app.get('/notice/:id', notice.show);

	app.get('/', function(req, res) { res.render('index'); });

}