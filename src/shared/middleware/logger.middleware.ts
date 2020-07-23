import { Middleware } from 'redux';
import { AppActionsDto } from '@core/actions';

export const loggerMiddleware: Middleware = (store) => (next) => (action: AppActionsDto) => {
	console.log(`Action: ${action.type}`);
	const result = next(action);
	console.log(`Result: ${JSON.stringify(store.getState(), null, '\t')}`);

	return result;
};
