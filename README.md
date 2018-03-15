# staats
How's your website going?

## What's this?

`staats` is a node script telling you how healthy is your website.

It currently gather a few scripts:

* [a11y](https://github.com/addyosmani/a11y) by Addy Osmani, that runs the Chrome Accessibility Inspector
* [psi](https://github.com/addyosmani/psi) by Addy Osmani again, that tests against Google PageSpeed Insight
* [dom-stats](https://github.com/johnotander/dom-stats) by John Ohtander
* [stylestats](https://github.com/t32k/stylestats) by Koji Ishimoto, as used in [www.stylestats.org](http://www.stylestats.org/)
* [html-validator](https://github.com/zrrrzzt/html-validator) by Geir Gåsodden, testing HTML with the [W3C NU validator](validator.w3.org/nu)
* [seo-checker](https://github.com/Clever-Labs/seo-checker) by Clever Labs

And I'd want to add some more.

## How to use?

Pretty easy. First, install it from npm:
```
npm i -g staats
```

Then simply run it with a target URL:
```
staats ffoodd.fr
```

And it should log a few things. And this is pretty ugly for now :)

### Working locally

If you want to bontribute, you may use `node cli.js {args}`.

## Roadmap

### Tools

* [ ] Add [observatory-cli](https://github.com/mozilla/observatory-cli) by mozilla
* [ ] Add [sitespeed.io](https://www.sitespeed.io/)
* [ ] Try [Passmarked](https://github.com/passmarked) scripts?
* [ ] Add [broken-link-checker](https://github.com/stevenvachon/broken-link-checker) by Steven Vachon, or:
 * using [pagelinks](https://github.com/zrrrzzt/pagelinks) by Geir Gåsodden
 * and [request](https://www.npmjs.com/package/request)(already in staats'dependecies) on each link
 * we might be able to check if every link returns a 200 HTTP response
* [ ] Add [Phantomas](https://github.com/macbre/phantomas) by Maciej Brencz
* [ ] Add [html-inspector](https://github.com/philipwalton/html-inspector) by Philip Walton
* [ ] Add [node-faux-pas](https://github.com/filamentgroup/node-faux-pas) by Zach Leatherman

### Usage

* [ ] Export to json file(s)
* [ ] Elaborate a notation strategy
* [ ] Get scores for accessibility, performance, security, search engine optimization
* [ ] Prettify the console output
