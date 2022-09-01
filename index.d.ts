export declare function promiseToSignal(promise: Promise<any>): AbortSignal
export declare function resolveToSignal(promise: Promise<any>): AbortSignal
export declare function rejectToSignal(promise: Promise<any>): AbortSignal
export declare function signalToPromise<T = any>(signal: AbortSignal): Promise<T>
export declare function signalToReject<Err = any>(signal: AbortSignal): Promise<never, Err>
