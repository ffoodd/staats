'use strict'

const isBlank = require('is-blank')
const nUrl    = require('normalize-url')
const psi     = require('psi')
const a11y    = require('a11y')
const html    = require('html-validator')
const styles  = require('stylestats')
const whois   = require('node-whois')

module.exports = (url) => {
  if (isBlank(url) || typeof url !== 'string') {
    throw new TypeError('staats expected a url as a string')
  };

  url = nUrl(url);

  psi(url, {nokey: 'true', strategy: 'mobile'}).then(data => {
    console.log('-------------------');
    console.log('Page Speed Insights');
    console.log('-------------------');

    console.log('Speed score: ' + data.ruleGroups.SPEED.score);
    console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
  });


  a11y(url, function (err, reports) {
    console.log('-------------------');
    console.log('Accessibility');
    console.log('-------------------');

    if (err) {
      console.error(err.message);
      process.exit(err.code || 1);
    }

    reports.audit.forEach(function (el) {
      if (el.result === 'FAIL') {
        console.log(el.severity + ': ' + el.heading);
        console.log(el.elements);
      }
    });
  });


  html({url: url, format: 'text'}, function (err, data) {
    console.log('-------------------');
    console.log('HTML validation');
    console.log('-------------------');

    if (err) {
      console.error(err.message);
    }

    console.log(data);
  });


  let css = new styles(url, {
    "ratioOfDataUriSize": false,
    "gzippedSize": false,
    "uniqueFontSizes": false,
    "uniqueFontFamilies": false,
    "uniqueColors": false,
    "uniqueBackgroundImages": false
  });
  css.parse(function (err, result) {
    console.log('-------------------');
    console.log('StyleStats');
    console.log('-------------------');

    if (err) {
      console.error(err.message);
    }

    console.log(result);
  });


  whois.lookup(url, function(err, data) {
    console.log('-------------------');
    console.log('WHOIS');
    console.log('-------------------');

    if (err) {
      console.error(err.message);
    }

    console.log(data)
})
}
