'use strict';

const gulp  = require('gulp');
const psi   = require('psi');
const axe   = require('gulp-axe-webdriver');
const louis = require('gulp-louis');

let site = 'http://www.ffoodd.fr';


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


gulp.task('louis', function() {
  louis({
    url: site,
    timeout: 60,
    outputFileName: 'reports/louis.json'
  });
});
