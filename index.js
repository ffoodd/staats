'use strict'

const isBlank = require('is-blank')
const nUrl    = require('normalize-url')
const psi     = require('psi')
const a11y    = require('a11y')

module.exports = (url) => {
  if (isBlank(url) || typeof url !== 'string') {
    throw new TypeError('staats expected a url as a string')
  };

  url = nUrl(url);

  psi(url, {nokey: 'true', strategy: 'mobile'}).then(data => {
    console.log('Page Speed Insights');
    console.log('-------------------');
    console.log('Speed score: ' + data.ruleGroups.SPEED.score);
    console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
    console.log('-------------------');
  });


  a11y(url, function (err, reports) {
    if (err) {
      console.error(err.message);
      process.exit(err.code || 1);
    }

    console.log('a11y');
    console.log('-------------------');

    reports.audit.forEach(function (el) {
      if (el.result === 'FAIL') {
        console.log(el.severity + ': ' + el.heading);
        console.log(el.elements);
      }
    });

    console.log('-------------------');
  });
}
