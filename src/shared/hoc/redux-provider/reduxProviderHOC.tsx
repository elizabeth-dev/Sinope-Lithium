import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { appPersistor } from '@core/state/app.store';
import { Action, AnyAction, Store } from 'redux';

export const reduxProviderHOC = <P extends {}, A extends Action = AnyAction>(WrappedComponent: React.FC<P>,
																			 store: Store<any, A>): React.FC<P> => (props) => (
	<Provider store={store}>
		<PersistGate persistor={appPersistor} loading={null}>
			<WrappedComponent {...props} />
		</PersistGate>
	</Provider>);
