require('jsdom-global')()

var deku = require('deku')
var stateful = require('../index')
var h = deku.element
var describe = require('tape-plus').describe

describe('deku-stateful', function (it) {
  var el

  it.beforeEach(function (t) {
    el = document.createElement('div')
  })

  function render (component) {
    var render = deku.dom.createRenderer(el, dispatch)
    function dispatch () { render(h(component)) }
    dispatch()
  }

  it('works', function (t) {
    var component = stateful({
      render: function (model) {
        return h('div', {}, 'hello world')
      }
    })

    render(component)
    t.equal(el.innerHTML, '<div>hello world</div>', 'first render')
  })

  it('works with pure components', function (t) {
    function component (model) {
      return h('div', {}, 'hello world')
    }

    render(component)
    t.equal(el.innerHTML, '<div>hello world</div>', 'first render')
  })

  it('supports initialState', function (t) {
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

    render(component)
    t.equal(el.innerHTML, '<div>hello jake</div>', 'first render')
  })

  it('supports setState', function (t, end) {
    t.plan(4) // 2 dispatch, 2 renders
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
      end()
    }, 100)
  })
})

require('tape')('eslint', require('tape-eslint')())
