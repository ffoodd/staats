'use strict'

const isBlank = require('is-blank')
const nUrl    = require('normalize-url')
const psi     = require('psi')
const a11y    = require('a11y')
const html    = require('html-validator')
const css     = require('w3c-css')
const styles  = require('stylestats')
const seo     = require('seo-checker')
const req     = require('request')
const request = require('request-promise-native')
const dom     = require('dom-stats')
const symbols = require('log-symbols')
const chalk   = require('chalk')

module.exports = (url) => {
  if (isBlank(url) || typeof url !== 'string') {
    throw new TypeError('staats expected a url as a string')
  };

  url = nUrl(url);
  
  function displayTitle(title) {
    console.log(`\n
        ${chalk.inverse.bold(title)}
    `)
  };
  
  function displayTest(test) {
    let symbol = (test.status ? symbols.success : symbols.error);

    console.log(chalk`${symbol} {bold ${test.name}} ${test.value}`)
  };
  
  /* Using Generators?
  @see https://hacks.mozilla.org/2015/05/es6-in-depth-generators/  
  function* displayresults(results) {
    for (let result in results) {
      yield result;
    }
  }*/

  html({url: url})
    .then(data => {
      displayTitle('HTML validation')
      
      let messages = JSON.parse(data);
      let results  = messages.messages.reduce((results, value, key) => { results[key] = value; return results; }, {});

      for (let result in results) {
        let test = new Object(results[result]);
          test.status = (results[result].type == "error");
          test.name   = results[result].message;
          if (!results[result].firstLine) {
            test.firstLine = results[result].lastLine;
          }
          test.value  = `From line ${results[result].firstLine}, column ${results[result].firstColumn}; to line ${results[result].lastLine}, column ${results[result].lastColumn}`;
          
        displayTest(test)
      }
    })
    .catch((error) => {console.error(error)});
  
  css.validate(url, function(error, data) {
    displayTitle('CSS validation')
    
    if(error) {
      console.error(error)
    } else {
      let results = data.errors;
      
      for (let result in results) {
        let test = new Object(results[result]);
          test.status = (results[result].errorType != "parse-error");
          test.name   = results[result].message;
          test.value  = `at line ${results[result].line}`;
          
        displayTest(test)
      }
    }
  });
    
  seo.load(url, function(data) {
    displayTitle('SEO')

    if (!data) {
      console.error('SEO checker failed :/')
    } else {
      let results = seo.meta(data);
      
      for (let result in results) {
        let test = new Object(result);
          test.status = !isBlank(results[result]);
          test.name   = result;
          test.value  = results[result];
          
        displayTest(test)
      }
    }
  });

  const stats = new styles(url, {
    "uniqueFontSizes": false,
    "uniqueFontFamilies": false,
    "uniqueColors": false,
    "uniqueBackgroundImages": false
  });
  stats.parse()
    .then(data => {
      displayTitle('CSS Stats')
      
      let results = JSON.parse(JSON.stringify(data));
      
      for (let result in results) {
        // if result is propertiesCount, we'll have to do better :)
        let test = new Object(result);
          // 100 is arbitrary value, need a way to define a budget!
          test.status = (parseInt(results[result]) >= 100);
          test.name   = result;
          test.value  = results[result];
          
        displayTest(test)
      }
    })
    .catch((error) => console.error(error));
  
  request(url)
    .then(data => {
      displayTitle('DOM Stats')

      let results = dom(data);
      
      for (let result in results) {
        // if result is tagCounts, we'll have to do better :)
        let test = new Object(result);
          // 100 is arbitrary value, need a way to define a budget!
          test.status = (parseInt(results[result]) >= 100);
          test.name   = result;
          test.value  = results[result];
          
        displayTest(test)
      }
    })
    .catch((error) => console.error(error));
    
  psi(url, {nokey: 'true', strategy: 'mobile'})
    .then(data => {
      displayTitle('Page Speed Insights Scores')
      
      let scores = data.ruleGroups;
      
      for (let result in scores) {
        let test = new Object(result);
          // 90 is arbitrary value, need a way to define a budget!
          test.status = (scores[result].score >= 90);
          test.name   = result;
          test.value  = scores[result].score;
          
        displayTest(test)
      }
      
      displayTitle('Page Speed Insights Stats')
      
      let results = data.pageStats;
      
      for (let result in results) {
        let test = new Object(result);
          // 100 is arbitrary value, need a way to define a budget!
          test.status = (parseInt(results[result]) >= 100);
          test.name   = result;
          test.value  = results[result];
          
        displayTest(test)
      }
      
      displayTitle('Page Speed Insights Tests')
      
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
          
        displayTest(test)
      }
    })
    .catch((error) => console.error(error));

  a11y(url, function (error, data) {
    displayTitle('Accessibility')

    if (error) {
      console.error(error.message)
    }
    
    let results = data.audit.reduce((results, value, key) => { results[key] = value; return results; }, {});

    for (let result in results) {
      let test = new Object(results[result]);
        test.status = (results[result].result == "FAIL");
        test.name   = results[result].heading;
        test.value  = results[result].elements.replace(/(\r\n\t|\n|\r\t)/gm, ', ');
        
      displayTest(test)
    }
  });
}
