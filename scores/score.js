const tool = require('seo-checker')

function Score(url) {
  this.url = url;
}

Score.prototype.getResults = function(url) {
  tool.load(url, function(r) {
    console.log('-------------------');
    console.log('SEO');
    console.log('-------------------');

    if (!r) {
      console.log('SEO checker failed :/');
    } else {
      let data = JSON.parse(JSON.stringify((tool.meta(r))));
      // Now we can check every single data in response
      console.log(data.title);
    }
  });
};

module.exports = Score;