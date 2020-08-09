import React from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { reduxProviderHOC } from '../redux-provider/reduxProviderHOC';
import { AnyAction, Action, Store } from 'redux';
import { Disclaimer } from '@shared/components/disclaimer/Disclaimer.component';
import { screenHOCStyles as styles } from './screenHOC.styles';

const _screenHOC: <P = {}>(
	WrappedComponent: React.FC<P>,
	disclaimer: boolean,
) => React.FC<P> = (WrappedComponent, disclaimer) => (props) => (
	<>
		{__DEV__ && disclaimer && (
			<Disclaimer style={[styles.disclaimer, styles.disclaimerTop]}>
				UNSTABLE - INSECURE
			</Disclaimer>
		)}
		<WrappedComponent {...props} />
		{__DEV__ && disclaimer && (
			<Disclaimer style={[styles.disclaimer, styles.disclaimerBottom]}>
				UNSTABLE - INSECURE
			</Disclaimer>
		)}
	</>
);

export const screenHOC: <P = {}, A extends Action = AnyAction>(
	WrappedComponent: React.FC<P>,
	store: Store<any, A>,
	disclaimer: boolean,
) => React.ComponentType<P> = (component, store, disclaimer = true) =>
	gestureHandlerRootHOC(
		reduxProviderHOC(_screenHOC(component, disclaimer), store),
	);
