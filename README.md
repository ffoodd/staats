# staats
How's your website going?

## What's this?

`staats` is a node script telling you how healthy is your website.

It currently gather a few scripts:

* [a11y](https://github.com/addyosmani/a11y) by Addy Osmani, that runs the Chrome Accessibility Inspector
* [psi](https://github.com/addyosmani/psi) by Addy Osmani again, that tests against Google PageSpeed Insight
* [dom-stats](https://github.com/johnotander/dom-stats) by John Ohtander
* [stylestats](https://github.com/t32k/stylestats) by Koji Ishimoto, as used in [www.stylestats.org](http://www.stylestats.org/)
* [html-validator](https://github.com/zrrrzzt/html-validator) by Geir Gåsodden, validating HTML through the [W3C NU validator](validator.w3.org/nu)
* [w3c-css](https://github.com/gchudnov/w3c-css) by Grigorii Chudnov, validating CSS through the [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/)
* [seo-checker](https://github.com/Clever-Labs/seo-checker) by Clever Labs.

See roadmap below for considered tools.

## How to use?

Pretty easy. First, install it from npm:
```
npm i -g staats
```

Then simply run it with a target URL:
```
staats ffoodd.fr
```

And it should log a few things. :)

### Working locally

If you want to contribute, you may use `node cli.js {args}`.

## Roadmap

Start with [issues](https://github.com/ffoodd/staats/issues) if you wanna help!

### Tools

* [ ] Use [aXe-core](https://github.com/dequelabs/axe-core) instead of a11y
* [ ] Add [observatory-cli](https://github.com/mozilla/observatory-cli) by mozilla
* [ ] Add [compat-tester](https://github.com/SphinxKnight/compat-tester/) by SphinxKnight
* [ ] Add [broken-link-checker](https://github.com/stevenvachon/broken-link-checker) by Steven Vachon
* [ ] Add [Phantomas](https://github.com/macbre/phantomas) by Maciej Brencz, instead of psi
* [ ] Add [node-faux-pas](https://github.com/filamentgroup/node-faux-pas) by Zach Leatherman
* [ ] Add [Wappalyzer](https://www.npmjs.com/package/wappalyzer).


