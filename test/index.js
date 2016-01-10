var test = require('tape')
var deku = require('deku')
var stateful = require('../index')
var h = deku.element

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

  component = stateful({
    initialState: function (model) {
      t.pass('initialstate called')
      return { name: 'jake' }
    },

    render: function (model) {
      return h('div', {}, 'hello ' + (model.state && model.state.name))
    }
  })

  dispatch()

  t.equal(el.innerHTML, '<div>hello jake</div>', 'first render')
  t.end()
})
