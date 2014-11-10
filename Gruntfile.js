module.exports = function(grunt){

	//config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['*.js', 'app/src/**/*.js', 'test/**/*.js']
		},
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['src/**/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		connect: {
			client: {
				options: {
					port: 2000,
					base: 'app',
					keepalive: true
				}
			}
		}
	});

	//load tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');

	//custom tasks
	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('server', ['connect:client']);
	grunt.registerTask('default', ['lint', 'concat', 'uglify']);
};