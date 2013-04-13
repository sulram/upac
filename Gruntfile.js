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
	watch: {
		ember_templates: {
			files: ['public/handlebars/**/*.hbs','public/handlebars/**/*.handlebars'],
			tasks: ['ember_templates']
		},
	}
});

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-ember-templates');


grunt.event.on('watch', function(action, filepath) {
  grunt.log.writeln(filepath + ' has ' + action);
});

grunt.registerTask('default', ['ember_templates']);

};