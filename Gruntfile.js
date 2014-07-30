module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-download-atom-shell');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  grunt.initConfig({
    'download-atom-shell': {
      version: '0.14.3',
      outputDir: 'binaries'
    },
    browserify: {
      dist: {
        files: {
          'build/bundle.js': ['app/www-jsx/**.js']
        },
        options: {
          browserifyOptions: {
            entry: 'app/www-jsx/main.js'
          },
          transform: [
            ['reactify', {es6:true}]
          ]
        }
      }
    },
    sass: {
      dist: {
        files: {
          'build/www/style.css': 'app/www-sass/main.scss'
        }
      }
    },
    copy: {
      chrome: {
        expand: true, cwd: 'app/www/', src: ['**'], dest: 'build/www'
      },
      www: {
        expand: true, cwd: 'app/chrome/', src: ['**'], dest: 'build/'
      },
      binary: {
        expand: true, cwd: 'build/', src: ['**'], dest: 'binaries/Atom.app/Contents/Resources/app'
      }
    }
  });
  grunt.registerTask('default', ['download-atom-shell', 'browserify:dist', 'copy:www', 'sass:dist', 'copy:chrome']);
};

