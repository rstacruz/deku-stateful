var test = require('tape')

test('invoking jsdom', require('jsdom-global/tape')())
require('./index')
