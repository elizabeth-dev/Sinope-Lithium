import { appPersistor } from '@core/state/app.store';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { Action, AnyAction, Store } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SplashLoading } from '../../../../views/splash/components/splash-loading/SplashLoading.component';

export const reduxProviderHOC =
	<P extends {}, A extends Action = AnyAction>(
		WrappedComponent: FC<P>,
		store: Store<any, A>,
		persistGate: boolean,
	): FC<P> =>
	(props) =>
		(
			<Provider store={store}>
				{persistGate ? (
					<PersistGate persistor={appPersistor} loading={<SplashLoading />}>
						<WrappedComponent {...props} />
					</PersistGate>
				) : (
					<WrappedComponent {...props} />
				)}
			</Provider>
		);
