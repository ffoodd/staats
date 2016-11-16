#! /usr/bin/env node
'use strict'

const meow = require('meow')
const shtml = require('shtml')
const isBlank = require('is-blank')
const isPresent = require('is-present')
const columnify = require('columnify')
const staats = require('./')

const cli = meow(shtml`
  <div>
    <underline>Usage</underline>
    $ staatsd [url] [options...]<br><br>
    <underline>Options</underline>
    -h, --help - Get help menu
    -v, --version - Get the version
    -a, --a11y - Only return accessibility
    -p, --psi - Only return page speed insights
    -c, --css - Only return cssstats
    -d, --dom - Only return dom stats<br><br>
    <underline>Examples</underline>
    $ staats johnotander.com
    $ staats johnotander.com --css<br><br>
`, {
  alias: {
    h: 'help',
    a: 'a11y',
    p: 'psi',
    c: 'css',
    d: 'dom'
  }
})

const url = cli.input[0]

staats(url).then(data => {
  let dataToShow = {}

  if (isPresent(cli.flags)) {
    if (cli.flags.dom) dataToShow.dom = data.dom
    if (cli.flags.a11y) dataToShow.a11y = data.a11y
    if (cli.flags.css) dataToShow.css = data.css
    if (cli.flags.psi) dataToShow.psi = data.psi
  } else {
    dataToShow = data
  }

  renderOutput(dataToShow)
})

const renderOutput = data => {

}
