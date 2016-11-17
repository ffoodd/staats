'use strict'

const isBlank      = require('is-blank')
const normalizeUrl = require('normalize-url')

module.exports = (url) => {
  if (isBlank(url) || typeof url !== 'string') {
    throw new TypeError('staats expected a url as a string')
  }

  url = normalizeUrl(url)

  return url;
}
