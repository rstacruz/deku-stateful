var test = require('tape')

test('invoking jsdom', tapeJsdom())

function tapeJsdom () {
  return function (t) {
    var jsdom = require('jsdom')

    var html = '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>'
    var blacklist = [ 'constructor', 'console', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval' ]

    process.env.JSDOM = 1
    var window = jsdom.jsdom(html).defaultView

    Object.keys(window).forEach((key) => {
      if (blacklist.indexOf(key) === -1) global[key] = window[key]
    })

    global.window = window
    window.console = global.console
    t.pass('jsdom on')
    t.end()
  }
}

require('./index')
