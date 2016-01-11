var test = require('tape')

test('invoking jsdom', function (t) {
  globalJsdom()
  t.pass('jsdom on')
  t.end()
})

require('./index')

function globalJsdom () {
  var jsdom = require('jsdom')

  var html = '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>'
  var blacklist = [
    'ArrayBuffer', 'Int8Array', 'Uint8Array', 'Uint8ClampedArray',
    'Int16Array', 'Uint16Array', 'Int32Array', 'Uint32Array', 'Float32Array',
    'Float64Array', 'toString', 'constructor', 'console', 'setTimeout',
    'clearTimeout', 'setInterval', 'clearInterval' ]

  var document = jsdom.jsdom(html)
  var window = document.defaultView

  Object.keys(window).forEach((key) => {
    if (blacklist.indexOf(key) === -1) {
      global[key] = window[key]
    }
  })

  global.document = document
  global.window = window
  window.console = global.console
}
