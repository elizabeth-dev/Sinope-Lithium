import React from 'react';
import { Provider } from 'react-redux';
import { Action, AnyAction, Store } from 'redux';

export const reduxProviderHOC: <P = {}, A extends Action = AnyAction>(
	WrappedComponent: React.FC<P>,
	store: Store<any, A>,
) => React.FC<P> = (WrappedComponent, store) => (props) => (
	<Provider store={store}>
		<WrappedComponent {...props} />
	</Provider>
);
