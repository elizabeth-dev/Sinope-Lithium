import { Middleware } from 'redux';

export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
	console.log(`Action: ${action}`);
	const result = next(action);
	console.log(`Result: ${JSON.stringify(store.getState(), null, '\t')}`);

	return result;
};
