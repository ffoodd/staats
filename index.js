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

module.exports = (url) => {
  if (isBlank(url) || typeof url !== 'string') {
    throw new TypeError('staats expected a url as a string')
  };

  url  = nUrl(url);

  html({url: url})
    .then((data) => {
      console.log('-------------------')
      console.log('HTML validation')
      console.log('-------------------')
      
      let results = JSON.parse(data);
      
      results.messages.forEach( function(result, index) {
        let test = new Object(result);
          test.status = result.subType;
          test.name   = result.message;
          if (!result.firstLine) {
            test.firstLine = result.lastLine;
          }
          test.value  = `From line ${result.firstLine}, column ${result.firstColumn}; to line ${result.lastLine}, column ${result.lastColumn}`;
          
        console.log(test.status + ' // ' + test.name + ' // ' + test.value)
      })
    })
    .catch((error) => {
      console.error(error)
    });
    
  seo.load(url, function(response) {
    console.log('-------------------');
    console.log('SEO');
    console.log('-------------------');

    if (!response) {
      console.error('SEO checker failed :/');
    } else {
      let results = seo.meta(response);
      
      for (let result in results) {
        let test = new Object(result);
          test.status = isBlank(results[result]);
          test.name   = result;
          test.value  = results[result];
          
        console.log(test.status + ' // ' + test.name + ' // ' + test.value)
      }
    }
  });

  const css = new styles(url, {
    "uniqueFontSizes": false,
    "uniqueFontFamilies": false,
    "uniqueColors": false,
    "uniqueBackgroundImages": false
  });
  css.parse()
    .then((data) => {
      console.log('-------------------')
      console.log('CSS stats')
      console.log('-------------------')
      
      let results = JSON.parse(JSON.stringify(data));
      
      for (let result in results) {
        let test = new Object(result);
          // 100 is arbitrary value, need a way to define a budget!
          test.status = (parseInt(results[result]) >= 100);
          test.name   = result;
          test.value  = results[result];
          
        console.log(test.status + ' // ' + test.name + ' // ' + test.value)
      }
    })
    .catch((err) => console.error(err));
  
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
  });*/  /*psi(url, {nokey: 'true', strategy: 'mobile'}).then(data => {
      console.log('-------------------');
      console.log('Page Speed Insights');
      console.log('-------------------');

      console.log('Speed score: ' + data.ruleGroups.SPEED.score);
      console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
      console.log(data.pageStats);
    });*/

  /*request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('-------------------');
      console.log('DOM');
      console.log('-------------------');

      console.log( dom( body.toString() ) );
    }
  });*/
}
