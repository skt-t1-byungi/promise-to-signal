# @byungi/promise-to-signal

## API

### promiseToSignal(promise, options?)

```js
import { promiseToSignal } from '@byungi/promise-to-signal'

const delayPromise = ms => new Promise(resolve => setTimeout(resolve, ms))

fetch({
    /* ... */
    signal: promiseToSignal(delayPromise(3000)), // 👈 Add timeout.
})
```

#### options.waitFor

### signalToPromise(signal, options?)

```js
import { signalToPromise } from '@byungi/promise-to-signal'

const controller = new AbortController()
const cancel = () => controller.abort()

/* ... */

await Promise.race([
    asyncTask(),
    signalToPromise(controller.signal), // 👈 Add cancellation.
])
```

#### options.rejection

## License

MIT
