export function promiseToSignal(promise, { waitFor } = {}) {
    const aborter = new AbortController()
    promise[
        {
            resolve: 'then',
            reject: 'catch',
        }[waitFor] || 'finally'
    ](() => aborter.abort())
    return aborter.signal
}

export function signalToPromise(signal, { rejection = false } = {}) {
    if (signal.aborted) return Promise.resolve(signal.reason)
    return new Promise((resolve, reject) => {
        signal.addEventListener('abort', ev => (rejection ? reject : resolve)(ev.target?.reason), { once: true })
    })
}
