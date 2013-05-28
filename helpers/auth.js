module.exports = function(_) { return {
	requiresLogin: function(req, res, next) {
		if (!req.isAuthenticated()) {
			return res.jsonxf(401, [{error: 'not logged in'}], {error:'not logged in'});
		}
		next();
	},
	requiresAdmin: function(req, res, next) {
		if (!req.isAdmin()) {
			return res.jsonxf(401, [{error: 'not authorized'}], {error: 'needs admin privileges'});
		}
		next();
	},
	requiresAdminLogin: function(req, res, next) {
		if(!req.isAdmin()) {
			return res.redirect('/admin/signin');
		}
		next();
	},
	user: {
		isVerified: function(req, res, next) {
			if (req.user.verificationToken != '') {
				return res.jsonxf(401,[{error: 'user not verified'}], {error: 'user not verified'});
			}
			next();
		},
		hasAuthorization: function(req, res, next) {
			if((req.profile.id != req.user.id)&&!req.isAdmin()) {
				return res.jsonxf(401,[{error: 'not authorized'}], {error: 'not authorized'});
			}
			next();
		}
	},
	article: {
		hasAuthorization: function(req, res, next) {
			if(_.contains(req.article.owners, req.user.id)||req.isAdmin()) {
				next();
			} else {
				return res.jsonxf(401,[{error: 'not authorized'}], {error: 'not authorized'});
			}
		}
	},
	tag: {
		hasAuthorization: function(req, res, next) {
			if(_.contains(req.tag.owners, req.user.id)||req.isAdmin()) {
				next();
			} else {
				return res.jsonxf(401,[{error: 'not authorized'}], {error: 'not authorized'});
			}
		}
	},
	event: {
		hasAuthorization: function(req, res, next) {
			if(_.contains(req.event.owners, req.user.id) || req.isAdmin()) {
				next();
			} else {
				return res.jsonxf(401,[{error: 'not authorized'}], {error: 'not authorized'});				
			}			
		}
	},
	notice: {
		hasAuthorization: function(req, res, next) {
			if((req.notice.owner.id != req.user.id) && !req.isAdmin()) {
				return res.jsonxf(401, [{error: 'not authorized'}], {error: 'not authorized'});
			} else {
				next();
			}
		}
	}
}}