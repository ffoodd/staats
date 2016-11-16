module.exports = function(grunt) {
  const site = 'http://www.ffoodd.fr';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    pagespeed: {
      options: {
        nokey: true,
        url: site
      },
      prod: {
        options: {
          url: site,
          locale: "fr_FR",
          strategy: 'desktop',
          threshold: 80
        }
      },
      paths: {
        options: {
          paths: ["/", "/travaux"],
          locale: "en_GB",
          strategy: "desktop",
          threshold: 80
        }
      }
    },
    phantomas: {
      gruntSite : {
        options : {
          indexPath : './reports/phantomas/',
          options   : {
            'timeout' : 30
          },
          url       : site,
          buildUi   : false,
          output    : 'json'
        }
      }
    },
    a11y: {
      dev: {
        options: {
          urls: [site]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-pagespeed');
  grunt.loadNpmTasks('grunt-phantomas');
  grunt.loadNpmTasks('grunt-a11y');

  grunt.registerTask('default', ['pagespeed']);

};
