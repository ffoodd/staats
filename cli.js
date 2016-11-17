#! /usr/bin/env node

const meow    = require('meow')
const shtml   = require('shtml')
const isBlank = require('is-blank')
const staats  = require('./')

const cli = meow(shtml`
  <div>
    <underline>Usage</underline>
    $ staats [options...]<br><br>
    <underline>Options</underline>
    -h, --help - Get help menu
    <underline>Examples</underline>
    $ staats --help<br><br>
`, {
  alias: {
    h: 'help'
  }
})

const url = cli.input[0]

return staats(url);
