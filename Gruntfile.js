module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            combine: {
                files: {
                    'build/css/webWidgets.css': ['src/css/*.css']
                }
            },
            minify: {
                expand: true,
                cwd: 'build/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'build/css/',
                ext: '.min.css'
            }
        },
        concat: {
            dist: {
                src: ['src/js/*.js'],
                dest: 'build/js/webWidgets.js'
            }
        },
        uglify: {
            build: {
                src: 'build/js/webWidgets.js',
                dest: 'build/js/webWidgets.min.js'
            }
        },
        jsdoc: {
            docstrap: {
                src: ['src/js/*.js'],
                options: {
                    destination: 'doc',
                    template: "doc/ink-docstrap/template",
                    configure: "doc/ink-docstrap/template/jsdoc.conf.json"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jsdoc');


    grunt.registerTask('doc', ['jsdoc:docstrap']);
    grunt.registerTask('build', ['cssmin:combine', 'cssmin:minify', 'concat', 'uglify']);
};