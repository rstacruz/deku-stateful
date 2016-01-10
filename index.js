var assign = require('object-assign')
var debounce = require('simpler-debounce')

module.exports = function stateful (Component, options) {
  if (!options) options = {}
  if (!options.action) options.action = { type: 'UI_STATE_CHANGE' }

  var states = {}
  var dispatch

  var update = debounce(function () {
    dispatch(options.action)
  }, 0)

  /*
   * Pass through `render()` with state and setState added.
   * Also, if it's the first render, call `initialState` if it exists.
   */

  function render (model) {
    if (!states.hasOwnProperty(model.path)) {
      states[model.path] = (Component.initialState && Component.initialState(model))
    }

    return Component.render(decorateModel(model))
  }

  /*
   * Updates state and schedules a dispatch on the next tick.
   */

  function setState (model) {
    return function (values) {
      if (typeof states[model.path] === 'object' && typeof values === 'object') {
        states[model.path] = assign({}, states[model.path], values)
      } else {
        states[model.path] = values
      }
      dispatch = model.dispatch
      update()
    }
  }

  /*
   * Clear out states on remove.
   */

  function onRemove (model) {
    states[model.path] = undefined
    if (Component.onRemove) Component.onRemove(model)
  }

  /*
   * Pass through `onUpdate()` with state and setState added.
   */

  function onUpdate (model) {
    if (Component.onUpdate) Component.onUpdate(decorateModel(model))
  }

  /*
   * Adds `state` and `setState` to the model.
   */

  function decorateModel (model) {
    return assign({}, model, {
      state: states[model.path],
      setState: setState(model)
    })
  }

  return assign({}, Component, {
    render: render,
    onRemove: onRemove,
    onUpdate: onUpdate
  })
}
