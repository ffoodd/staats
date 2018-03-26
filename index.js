'use strict'

const isBlank = require('is-blank')
const nUrl    = require('normalize-url')
const psi     = require('psi')
const a11y    = require('a11y')
const html    = require('html-validator')
const styles  = require('stylestats')
const seo     = require('seo-checker')
const request = require('request')
const dom     = require('dom-stats')

var Score = require('./scores/score.js')

module.exports = (url) => {
  if (isBlank(url) || typeof url !== 'string') {
    throw new TypeError('staats expected a url as a string')
  };

  url  = nUrl(url);

  /*psi(url, {nokey: 'true', strategy: 'mobile'}).then(data => {
    console.log('-------------------');
    console.log('Page Speed Insights');
    console.log('-------------------');

    console.log('Speed score: ' + data.ruleGroups.SPEED.score);
    console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
    console.log(data.pageStats);
  });*/


  /*a11y(url, function (error, reports) {
    console.log('-------------------');
    console.log('Accessibility');
    console.log('-------------------');

    if (error) {
      console.error(error.message);
      process.exit(error.code || 1);
    }

    reports.audit.forEach(function (el) {
      if (el.result === 'FAIL') {
        console.log(el.severity + ': ' + el.heading);
        console.log(el.elements);
      }
    });
  });*/


  /*html({url: url, format: 'text'}, function (error, data) {
    console.log('-------------------');
    console.log('HTML validation');
    console.log('-------------------');
s
    if (error) {
      console.error(error.message);
    }

    console.log(data);
  });*/


  /*let css = new styles(url, {
    "ratioOfDataUriSize": false,
    "gzippedSize": false,
    "uniqueFontSizes": false,
    "uniqueFontFamilies": false,
    "uniqueColors": false,
    "uniqueBackgroundImages": false
  });
  css.parse(function (error, result) {
    console.log('-------------------');
    console.log('StyleStats');
    console.log('-------------------');

    if (error) {
      console.error(error.message);
    }

    console.log(result);
  });*/


  /*seo.load(url, function(response) {
    console.log('-------------------');
    console.log('SEO');
    console.log('-------------------');

    if (!response) {
      console.log('SEO checker failed :/');
    } else {
      let data = JSON.parse(JSON.stringify(seo.meta(response)));
      // Now we can check every single data in response
      console.log( data.title );
    }
  });*/
  
  let seo = new Score();
  
  seo.getResults(url);

  /*request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('-------------------');
      console.log('DOM');
      console.log('-------------------');

      console.log( dom( body.toString() ) );
    }
  });*/
}
