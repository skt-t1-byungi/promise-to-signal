import { test } from 'tap'
import { promiseToSignal, signalToPromise } from './index.mjs'
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'

test('promiseToSignal', async t => {
    t.type(promiseToSignal(newDefer().promise), AbortSignal)
    await t.test('- waitFor', async t => {
        ;[
            {
                waitFor: 'resolve',
                before: 'notOk',
                toBe: 'resolve',
                after: 'ok',
            },
            {
                waitFor: 'resolve',
                before: 'notOk',
                toBe: 'reject',
                after: 'notOk',
            },
            {
                waitFor: 'reject',
                before: 'notOk',
                toBe: 'resolve',
                after: 'notOk',
            },
            {
                waitFor: 'reject',
                before: 'notOk',
                toBe: 'reject',
                after: 'ok',
            },
            {
                waitFor: 'settle',
                before: 'notOk',
                toBe: 'resolve',
                after: 'ok',
            },
            {
                waitFor: 'settle',
                before: 'notOk',
                toBe: 'reject',
                after: 'ok',
            },
        ].forEach(async o => {
            const defer = newDefer()
            const signal = promiseToSignal(defer.promise, { waitFor: o.waitFor })

            let res = true
            res &= t[o.before](signal.aborted)
            await defer[o.toBe]()
            res &= t[o.after](signal.aborted)

            if (!res) {
                t.fail(`Failed - ${JSON.stringify(o)}`)
            }
        })
    })
})

test('signalToPromise', async t => {
    const aborter = new AbortController()
    const p = signalToPromise(aborter.signal)
    t.type(p, Promise)
    aborter.abort('test')
    t.equal(await p, 'test')

    await t.test('- rejection', async t => {
        t.plan(1)
        const aborter = new AbortController()
        const p = signalToPromise(aborter.signal, { rejection: true })
        aborter.abort('aborted')
        await p.catch(err => {
            t.equal(err, 'aborted')
        })
    })
})

function newDefer() {
    const o = {}
    return Object.assign(o, {
        promise: new Promise((resolve, reject) =>
            Object.assign(o, {
                resolve,
                reject,
            })
        ),
    })
}
