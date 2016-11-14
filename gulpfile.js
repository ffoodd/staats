'use strict';

var gulp = require('gulp');
var a11y = require('a11y');

gulp.task('a11y', function() {
  return a11y('https://aduggin.github.io/accessibility-fails/', function (err, reports) {
      reports.audit.forEach(function (el) {
        console.log(el);
      });
  });
});
