'use strict'

const isBlank = require('is-blank')
const nUrl    = require('normalize-url')
const psi     = require('psi')
const a11y    = require('a11y')
const html    = require('html-validator')
const styles  = require('stylestats')
const seo     = require('seo-checker')
const req     = require('request')
const request = require('request-promise-native')
const dom     = require('dom-stats')

module.exports = (url) => {
  if (isBlank(url) || typeof url !== 'string') {
    throw new TypeError('staats expected a url as a string')
  };

  url  = nUrl(url);

  html({url: url})
    .then(data => {
      console.log('-------------------')
      console.log('HTML validation')
      console.log('-------------------')
      
      let results = JSON.parse(data);
      
      for (let result in results.messages) {
        let test = new Object(result);
          test.status = (result.type == "error");
          test.name   = result.message;
          if (!result.firstLine) {
            test.firstLine = result.lastLine;
          }
          test.value  = `From line ${result.firstLine}, column ${result.firstColumn}; to line ${result.lastLine}, column ${result.lastColumn}`;
          
        console.log(test.status + ' // ' + test.name + ' // ' + test.value)
      }
    })
    .catch((error) => {console.error(error)});
  
  /*seo.load(url, function(data) {
    console.log('-------------------')
    console.log('SEO')
    console.log('-------------------')

    if (!data) {
      console.error('SEO checker failed :/')
    } else {
      let results = seo.meta(data);
      
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
    .then(data => {
      console.log('-------------------')
      console.log('CSS stats')
      console.log('-------------------')
      
      let results = JSON.parse(JSON.stringify(data));
      
      for (let result in results) {
        // if result is propertiesCount, we'll have to do better :)
        let test = new Object(result);
          // 100 is arbitrary value, need a way to define a budget!
          test.status = (parseInt(results[result]) >= 100);
          test.name   = result;
          test.value  = results[result];
          
        console.log(test.status + ' // ' + test.name + ' // ' + test.value)
      }
    })
    .catch((error) => console.error(error));
  
  request(url)
    .then(data => {    
      console.log('-------------------')
      console.log('DOM')
      console.log('-------------------')

      let results = dom(data);
      
      for (let result in results) {
        // if result is tagCounts, we'll have to do better :)
        let test = new Object(result);
          // 100 is arbitrary value, need a way to define a budget!
          test.status = (parseInt(results[result]) >= 100);
          test.name   = result;
          test.value  = results[result];
          
        console.log(test.status + ' // ' + test.name + ' // ' + test.value)
      }
    })
    .catch((error) => console.error(error));
    
  psi(url, {nokey: 'true', strategy: 'mobile'})
    .then(data => {
      console.log('-------------------')
      console.log('Page Speed Insights Scores')
      console.log('-------------------')
      
      let scores = data.ruleGroups;
      
      for (let result in scores) {
        let test = new Object(result);
          // 90 is arbitrary value, need a way to define a budget!
          test.status = (scores[result].score >= 90);
          test.name   = result;
          test.value  = scores[result].score;
          
        console.log(test.status + ' // ' + test.name + ' // ' + test.value)
      }
      
      console.log('-------------------')
      console.log('Page Speed Insights Stats')
      console.log('-------------------')
      
      let results = data.pageStats;
      
      for (let result in results) {
        let test = new Object(result);
          // 100 is arbitrary value, need a way to define a budget!
          test.status = (parseInt(results[result]) >= 100);
          test.name   = result;
          test.value  = results[result];
          
        console.log(test.status + ' // ' + test.name + ' // ' + test.value)
      }
      
      console.log('-------------------')
      console.log('Page Speed Insights Tests')
      console.log('-------------------')
      
      let formattedResults = data.formattedResults.ruleResults;
      
      for (let result in formattedResults) {
        let test = new Object(result);
          // 100 is arbitrary value, need a way to define a budget!
          test.status = (formattedResults[result].ruleImpact > 0);
          test.name   = formattedResults[result].localizedRuleName;
          test.value  = formattedResults[result].groups;
          if (formattedResults[result].summary) {
            test.value  = formattedResults[result].summary.format;
          }
          
        console.log(test.status + ' // ' + test.name + ' // ' + test.value)
      }
    })
    .catch((error) => console.error(error));

  a11y(url, function (error, data) {
    console.log('-------------------')
    console.log('Accessibility')
    console.log('-------------------')

    if (error) {
      console.error(error.message)
    }
    
    data.audit.forEach(function (result) {
      let test = new Object(result);
        test.status = (result.result == "FAIL");
        test.name   = result.heading;
        test.value  = result.elements.replace(/(\r\n\t|\n|\r\t)/gm, ', ');
        
      console.log(test.status + ' // ' + test.name + ' // ' + test.value)
    });
  });*/
}
