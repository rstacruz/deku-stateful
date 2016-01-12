var test = require('tape')
var deku = require('deku')
var stateful = require('../index')
var h = deku.element

test('invoking jsdom', require('jsdom-global/tape')())

test('stateful', function (t) {
  var el = document.createElement('div')
  var render = deku.dom.createRenderer(el, dispatch)
  function dispatch () { render(h(component)) }

  var component = stateful({
    render: function (model) {
      return h('div', {}, 'hello world')
    }
  })

  dispatch()

  t.equal(el.innerHTML, '<div>hello world</div>', 'first render')
  t.end()
})

test('initialState', function (t) {
  var el = document.createElement('div')
  var render = deku.dom.createRenderer(el, dispatch)
  function dispatch () { render(h(component)) }

  t.plan(2)

  var component = stateful({
    initialState: function (model) {
      t.pass('initialstate called')
      return { name: 'jake' }
    },

    render: function (model) {
      return h('div', {}, 'hello ', model.state.name)
    }
  })

  dispatch()

  t.equal(el.innerHTML, '<div>hello jake</div>', 'first render')
  t.end()
})

test('set state', function (t) {
  t.plan(4) // 2 dispatch, 2 renders
  var el = document.createElement('div')
  var render = deku.dom.createRenderer(el, dispatch)

  function dispatch () {
    t.pass('dispatch called')
    render(h(component))
  }

  var component = stateful({
    initialState: function (model) {
      return { name: 'jake' }
    },

    render: function (model) {
      setTimeout(function () {
        if (model.state.name === 'jake') {
          model.setState({ name: 'john' })
        }
      })
      return h('div', {}, 'hello ', model.state.name)
    }
  })

  dispatch()

  t.equal(el.innerHTML, '<div>hello jake</div>', 'first render')

  setTimeout(function () {
    t.equal(el.innerHTML, '<div>hello john</div>', 'next render')
    t.end()
  }, 100)
})

test('eslint', require('tape-eslint')())
