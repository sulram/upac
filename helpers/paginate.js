module.exports = function(_){
	return {
		paginate: function(model, query_terms, defaults, req, cb) {
			var inner_defaults = {
				from: 0,
				limit: 10,
				sort_by: '',
				order: 1
			}
			var options = _.defaults(defaults, inner_defaults);
			options = _.defaults(req.query, options)
			options = _.defaults(req.body, options)
			var query = model.find(query_terms);
			if(options.populate) {
				query.populate(options.populate);
			}
			if(options.sort_by != '') {
				query.sort((options.order==-1)?'-'+options.sort_by:options.sort_by);
			}
			if(options.limit > 0) {
				query.skip(options.from).limit(options.limit);
			} else {
				options.from = 0;
			}
			query.exec(function(err, data) {
				model.count(query_terms, function(err, count) {
					return cb(err, data, _.extend({count:count},options));
				})
				
			});
		},
		paginate_view: function(data) {

		}
	}
}