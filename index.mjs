export function promiseToSignal(p) {
    return newSignal(abort => p.finally(abort))
}

export function resolveToSignal(p) {
    return newSignal(abort => p.then(abort))
}

export function rejectToSignal(p) {
    return newSignal(abort => p.catch(abort))
}

function newSignal(fn) {
    const aborter = new AbortController()
    fn(() => aborter.abort())
    return aborter.signal
}

export function signalToPromise(s) {
    if (s.aborted) return Promise.resolve(s.reason)
    return new Promise(resolve => {
        s.addEventListener('abort', ev => resolve(ev.target?.reason), { once: true })
    })
}

export function signalToReject(s) {
    return signalToPromise(s).then(reason => Promise.reject(reason))
}
