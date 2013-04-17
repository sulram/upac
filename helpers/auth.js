module.exports = function(_) { return {
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
			if(_.contains(req.article.owners, req.user.id)) {
				next();
			} else {
				return res.json(401, {error: 'not authorized'});				
			}
		}
	},
	event: {
		hasAuthorization: function(req, res, next) {
			if(_.contains(req.event.owners, req.user.id)) {
				next();
			} else {
				return res.json(401, {error: 'not authorized'});				
			}			
		}
	}
}}