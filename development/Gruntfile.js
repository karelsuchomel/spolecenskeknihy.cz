module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      watchSASS: {
        files: ['sass/**/*.sass'],
        tasks: ['sass:main'],
      },
      watchCSS: {
        files: ['../css/css.min.css'],
        tasks: ['postcss', 'ftp-deploy'],
        options: {
          debounceDelay: 5000,
        },
      },
    },
    sass: {
      main: {
        options: {             // Target options
          style: 'expanded',   // options: nested, compact, compressed, expanded
          sourcemap: 'none',   // options: auto, file, inline, none
        },
        files: {               // Dictionary of files
          '../css/css.min.css': 'sass/import.sass',  // 'destination': 'source'
        },
      },
    },
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({browsers: ['last 20 versions']}),
          //require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: '../css/*.css'
      }
    },
    'ftp-deploy' : {
      build: {
        auth: {
          host: 'chvilova.savana-hosting.cz',
          port: 21,
          authKey: 'key1'
        },
        src: ['../css/'],
        dest: '/spolecenskeknihy.cz/css/',
        exclusions: [ '../development', '../.gitignore', '../cmd2', '../.git']
      }
    }
  });

  //looks for your grunt.initConfig object
  // watch
  grunt.loadNpmTasks('grunt-contrib-watch');
  // compile Sass to CSS
  grunt.loadNpmTasks('grunt-contrib-sass');
  // enable CSS prefixing
  grunt.loadNpmTasks('grunt-postcss');
  // ftp deploy
  grunt.loadNpmTasks('grunt-ftp-deploy');
  // set default
  grunt.registerTask('default', ['sass', 'watch', 'postcss']);
  grunt.registerTask('ftp', ['ftp-deploy']);
};
