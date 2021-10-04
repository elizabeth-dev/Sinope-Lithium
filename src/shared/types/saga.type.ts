import { Effect, SimpleEffect } from 'redux-saga/effects';

/** Strip any saga effects from a type; this is typically useful to get the return type of a saga. */
type StripEffects<T> = T extends IterableIterator<infer E>
	? E extends Effect | SimpleEffect<any, any>
		? never
		: E
	: never;

/** Unwrap the type to be consistent with the runtime behavior of a call. */
type DecideReturn<T> = T extends Promise<infer R>
	? R // If it's a promise, return the promised type.
	: T extends IterableIterator<any>
	? StripEffects<T> // If it's a generator, strip any effects to get the return type.
	: T; // Otherwise, it's a normal function and the return type is unaffected.

/** Determine the return type of yielding a call effect to the provided function.
 *
 * Usage: const foo: CallReturnType&lt;typeof func&gt; = yield call(func, ...)
 */
export type CallReturn<T extends (...args: any[]) => any> = DecideReturn<ReturnType<T>>;
