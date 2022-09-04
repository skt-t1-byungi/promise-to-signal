# @byungi/promise-to-signal

Convert a Promise to a AbortSignal.

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

-   `settle` (Default) - Wait for Promise to be `resolved` or `rejected`.
-   `resolve` - Wait for Promise to be `resolved`.
-   `reject` - Wait for Promise to be `rejected`.

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

Instead of resolved, it is rejected with abort's reason.

```js
try {
    await Promise.race([
        asyncTask(),
        signalToPromise(signal, {
            rejection: true,
        }),
    ])
} catch (err) {
    if (err instanceof DOMException) {
        /* ... */
    }
}
```

This option does not support custom errors. Instead, do it like below.

```js
signalToPromise(signal).then(() => {
    throw new CustomError()
})
```

## License

MIT
