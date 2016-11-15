'use strict';

var gulp = require('gulp');
var psi  = require('psi');
var axe = require('gulp-axe-webdriver');

var site = 'http://www.ffoodd.fr';


gulp.task('axe', function(done) {
  var options = {
      saveOutputIn: 'axe.json',
      folderOutputReport: 'reports',
      urls: [site]
    };
    return axe(options, done);
});


gulp.task('psi', function () {
    return psi.output(site, {
        nokey: 'true',
        strategy: 'mobile'
    });
});
