# deku-stateful

> Keep state in Deku components

Deku v2 has no states in components. This is a higher-order component that adds `state` and `setState` to the model.
See this [conversation here](https://github.com/dekujs/deku/issues/337#issuecomment-168034492).

```js
import stateful from 'deku-stateful'

function render ({ state, setState }) {
  // ...
}

export default stateful({ render })
```

## Thanks

**deku-stateful** © 2016+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/deku-stateful/contributors
