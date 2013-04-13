var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Article = mongoose.model('Article')

module.exports = {
	index: function(req, res) {
		res.json({msg:'ok'});
	},
	create: function(req, res) {
		var article = new Article(req.data);
		article.owner.push(req.user.id);
		res.json({msg:'ok'});
	},
	show: function(req, res, next, id) {
		Article.findById(id, function(err, article){
			if(err) return next(err);
			if(!article) return res.json(404, {error: 'article not found'});
			res.json({article:{
				title: article.title,
				content: article.content,
				owners: article.owners,
				slug: article.slug
			}});
		});
	},
	update: function(req, res) {

	},
	remove: function(req, res, next, id) {
		Article.remove({_id: id})
	},
	bySlug: function(req, res, next, slug) {
		
	},
	byUser: function(req, res, next, username) {

	}
}