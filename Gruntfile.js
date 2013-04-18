module.exports = function(grunt) {

	/*grunt.registerTask('default', 'Log some stuff.', function() {
		grunt.log.write('Logging some stuff...').ok();
	});*/


grunt.initConfig({
	ember_templates: {
		compile: {
			options: {
				templateName: function(sourceFile) {
					return sourceFile.replace(/public\/handlebars\//, '');
				}
			},
			files: {
				//"path/to/result.js": "path/to/source.handlebars",
				"public/js/app-templates.js": ["public/handlebars/**/*.hbs", "public/handlebars/**/*.handlebars"]
			}
		}
	},
	uglify: {
		options: {
			mangle: false
		},
		my_target: {
			files: {
				'public/js/upac.min.js': [
					'public/js/libs/handlebars.js',
					'public/js/libs/underscore.js',
					'public/js/libs/jquery.js',
					'public/js/libs/ember.js',
					'public/js/mapstyles.js',
					'public/js/app-templates.js',
					'public/js/app-init.js',
					'public/js/app-models.js',
					'public/js/app-routes.js',
					'public/js/app-controllers.js',
					'public/js/app-views.js',
					'public/js/app-map.js'
				]
			}
		}
	},
	watch: {
		ember_templates: {
			files: ['public/handlebars/**/*.hbs','public/handlebars/**/*.handlebars'],
			tasks: ['ember_templates']
		}
	}
});

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-ember-templates');
grunt.loadNpmTasks('grunt-contrib-uglify');


grunt.event.on('watch', function(action, filepath) {
  grunt.log.writeln(filepath + ' has ' + action);
});

grunt.registerTask('default', ['ember_templates']);

};