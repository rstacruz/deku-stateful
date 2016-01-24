# deku-stateful

> Keep state in Deku components

Deku v2 has no states in components. This is a higher-order component that adds `state` and `setState` to the model.
See this [conversation here](https://github.com/dekujs/deku/issues/337#issuecomment-168034492).

Compatible with Deku 2.0.0 (tested with 2.0.0-rc11) and Decca 2.0.0.

[![Status](https://travis-ci.org/rstacruz/deku-stateful.svg?branch=master)](https://travis-ci.org/rstacruz/deku-stateful "See test builds")

```js
import stateful from 'deku-stateful'

function initialState () {
  return { clicked: 0 }
}

function render ({ state, setState }) {
  return <div>
    Clicked { state.clicked } times.
    <button onClick={ () => setState({ clicked: state.clicked + 1 }) }>
      Click me
    </button>
  </div>
}

export default stateful({ initialState, render })
```

## Example

- [Tabs example](https://jsfiddle.net/rstacruz/jwLncxfd/)
- [Simple counter example](https://jsfiddle.net/rstacruz/m6mkac75/)

## API

### render, onCreate, onUpdate

The `render` function and the lifecycle hooks will also be passed `state` and `setState`.

When `setState` is ran, it will queue up changes and dispatch an event like `dispatch({ type: 'UI_STATE_CHANGE' })`. This is meant to be picked up by your Redux store, which we're assuming will retrigger a `render()` when called.

### initialState

Your component can have an `initialState` function. Return the first state here.

```js
function initialState ({ props }) {
  return { clicked: false }
}

export default stateful({ initialState, render })
```

## Thanks

**deku-stateful** © 2016+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/deku-stateful/contributors
