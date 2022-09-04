export function promiseToSignal(promise, { waitFor } = {}) {
    const aborter = new AbortController()
    promise[
        {
            resolve: 'then',
            reject: 'catch',
        }[waitFor] || 'finally'
    ](() => aborter.abort())
        // Prevents the duplicate 'unhandledRejection'.
        .catch(Function.prototype)
    return aborter.signal
}

export function signalToPromise(signal, { rejection = false } = {}) {
    if (signal.aborted) {
        return Promise[rejection ? 'reject' : 'resolve'](signal.reason)
    }
    return new Promise((resolve, reject) => {
        signal.addEventListener(
            'abort',
            ev => {
                ;(rejection ? reject : resolve)(ev.target?.reason)
            },
            { once: true }
        )
    })
}
