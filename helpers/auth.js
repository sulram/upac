module.exports = {
	requiresLogin: function(req, res, next) {
		if (!req.isAuthenticated()) {
			return res.json(401, {error: 'not logged in'});
		}
		next();
	},
	user: {
		hasAuthorization: function(req, res, next) {
			if(req.profile.id != req.user.id) {
				return res.json(401, {error: 'not authorized'});
			}
			next();
		}
	},
	article: {
		hasAuthorization: function(req, res, next) {
			if(req.article.owner.id != req.user.id) {
				return res.json(401, {error: 'not authorized'});
			}
			next();
		}
	}
}