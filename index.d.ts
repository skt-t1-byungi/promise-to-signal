export declare function promiseToSignal(
    promise: Promise<any>,
    options?: {
        waitFor?: 'resolve' | 'reject' | 'settle'
    }
): AbortSignal

export declare function signalToPromise<T = any>(
    signal: AbortSignal,
    options?: {
        rejection?: boolean
    }
): Promise<T>
