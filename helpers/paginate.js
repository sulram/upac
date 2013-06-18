module.exports = function(_){
	return {
		paginate: function(model, query_terms, defaults, req, cb) {
			var inner_defaults = {
				from: 0,
				limit: 10,
				sort_by: '',
				sortorder: 1
			}
			var options = _.defaults(defaults, inner_defaults);
			options = _.defaults(req.query, options)
			options = _.defaults(req.body, options)
			var query = model.find(query_terms);
			if(options.sort_by != '') {
				query.sort((options.order==-1)?'-'+options.sort_by:options.sort_by);
			}
			query.skip(options.from).limit(options.limit);
			query.exec(function(err, data) {
				return cb(err, data, options);
			});
		},
		paginate_view: function(data) {

		}
	}
}